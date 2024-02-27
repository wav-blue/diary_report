import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Diary } from '../repository/entity/diary.entity';
import { IDiaryRepository } from '../repository/DAO/diary.dao';
import { CreateDiaryDto } from '../repository/DTO/createUser.dto';

@Injectable()
export class DiaryCreateService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
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

    let result: Promise<Diary>;

    try {
      result = this.diaryRepository.createDiary(
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
