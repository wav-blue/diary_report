import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Diary } from '../repository/entity/diary.entity';
import { IDiaryRepository } from '../repository/DAO/diary.dao';
import { CreateDiaryDto } from '../repository/DTO/createDiary.dto';
import { AxiosService } from 'src/axios/axios.service';

@Injectable()
export class DiaryCreateService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private readonly axiosService: AxiosService,
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

    try {
      this.logger.debug('요약 요청 시작');
      // 요약 요청
      const body = {
        content: createDiaryDto.content,
      };
      const summary = await this.axiosService.FlaskRequest(body);
      createDiaryDto.summary = summary;

      this.logger.verbose(`Flask 서버로의 요청 성공! ${summary}`);
    } catch (err) {
      // throw new InternalServerErrorException(
      //   '요약 요청이 이루어지지 않았습니다',
      // );
      this.logger.verbose(`요청 실패 ${createDiaryDto.summary}`);
    }

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
    return result;
  }
}
