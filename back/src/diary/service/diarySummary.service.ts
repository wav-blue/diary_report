import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Diary } from '../repository/entity/diary.entity';
import { AxiosService } from 'src/axios/axios.service';
import { IDiaryRepository } from '../repository/DAO/diary.repository';
import { DiaryReadService } from './diaryRead.service';

@Injectable()
export class DiarySummaryService {
  constructor(
    private readonly diaryReadService: DiaryReadService,
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private readonly axiosService: AxiosService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiarySummaryService.name);
  }

  async updateSummary(userId: string, diaryId: number): Promise<Diary> {
    const foundDiary = await this.diaryReadService.getDiaryById(
      userId,
      diaryId,
    );
    console.log(foundDiary);
    const content = foundDiary.content;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    let summary: string;
    try {
      this.logger.debug('요약 요청 시작');
      // 요약 요청
      const body = {
        content,
      };
      summary = await this.axiosService.FlaskRequest(body);

      this.logger.verbose(`Flask 서버로의 요청 성공! ${summary}`);
    } catch (err) {
      this.logger.verbose(`요청 실패 `);
    }

    let result: Diary;
    try {
      this.logger.debug('DB Update 시작');
      result = await this.diaryRepository.updateSummary(
        diaryId,
        summary,
        queryRunner,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return result;
  }
}
