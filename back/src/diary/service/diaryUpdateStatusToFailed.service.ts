import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { IDiaryRepository } from '../repository/DAO/diary.repository';

/*
status 'failed'로 UPDATE
*/
@Injectable()
export class DiaryUpdateStatusToFailedService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiaryUpdateStatusToFailedService.name);
  }

  async updateDiaryStatusToFailed(diaryId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      this.logger.debug('DB Update 시작');
      await this.diaryRepository.updateDiarySummaryToFailed(
        diaryId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
