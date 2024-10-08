import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { IDiaryRepository } from '../repository/DAO/diary.repository';
import { ResourceNotFoundException } from 'common/exception-filter/exception/common/resourceNotFound.exception';

/*
status 'completed'로 UPDATE, summary UPDATE
*/
@Injectable()
export class DiaryUpdateSummaryService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiaryUpdateSummaryService.name);
  }

  async updateSummary(
    userId: string,
    summary: string,
    diaryId: number,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const foundDiary = await this.diaryRepository.findDiary(
        diaryId,
        queryRunner,
      );

      if (!foundDiary || foundDiary.userId !== userId) {
        this.logger.debug('해당하는 리소스가 존재하지 않음');
        this.logger.debug(`${foundDiary.userId} //  ${userId}`);
        throw new ResourceNotFoundException();
      }

      this.logger.verbose('DB Update 시작');
      await this.diaryRepository.updateSummary(diaryId, summary, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return;
  }
}
