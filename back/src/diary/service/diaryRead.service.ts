import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Diary } from '../repository/entity/diary.entity';
import { IDiaryRepository } from '../repository/DAO/diary.repository';
import { ResourceNotFoundException } from 'common/exception-filter/exception/common/resourceNotFound.exception';
import { ReadDiaryDto } from '../repository/DTO/readDiary.dto';

@Injectable()
export class DiaryReadService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiaryReadService.name);
  }

  async getDiary(userId: string): Promise<Diary[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let result: Promise<Diary[]>;

    try {
      result = this.diaryRepository.readUserDiary(userId, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  async getDiaryById(diaryId: number): Promise<ReadDiaryDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let diary: ReadDiaryDto;

    try {
      diary = await this.diaryRepository.findDiary(diaryId, queryRunner);
      if (!diary) {
        throw new ResourceNotFoundException();
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return diary;
  }
}
