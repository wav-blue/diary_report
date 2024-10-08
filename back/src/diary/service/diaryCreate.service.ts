import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Diary } from '../repository/entity/diary.entity';
import { CreateDiaryDto } from '../repository/DTO/createDiary.dto';
import { IDiaryRepository } from '../repository/DAO/diary.repository';
import { AnalysisService } from '../analysis.service';

@Injectable()
export class DiaryCreateService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private readonly analysisService: AnalysisService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiaryCreateService.name);
  }

  async createDiary(
    createDiaryDto: CreateDiaryDto,
    userId: string,
  ): Promise<Diary> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let result: Diary;
    try {
      this.logger.debug('DB Create 시작');
      result = await this.diaryRepository.createDiary(
        createDiaryDto,
        userId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    // 댓글 분석 요청(job queue 등록)
    this.analysisService.addJob(result.diaryId, userId);

    return result;
  }
}
