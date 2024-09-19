import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { IDiaryRepository } from '../repository/DAO/diary.repository';
import { ResourceNotFoundException } from 'common/exception-filter/exception/common/resource-not-found.exception';

@Injectable()
export class DiaryDeleteService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiaryDeleteService.name);
  }

  async deleteDiary(diaryId: number, userId: string): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const diary = await this.diaryRepository.findDiary(diaryId, queryRunner);
      if (!diary || diary.userId !== userId) {
        // 존재하지 않거나 해당 권한 없음
        throw new ResourceNotFoundException();
      }
      await this.diaryRepository.deleteDiary(diaryId, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return 'success';
  }
}
