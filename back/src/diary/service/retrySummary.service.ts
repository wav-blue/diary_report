import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { IDiaryRepository } from '../repository/DAO/diary.repository';
import { ResourceNotFoundException } from 'common/exception-filter/exception/common/resourceNotFound.exception';
import { DiaryStatus } from '../enum/diaryStatus.enum';
import { AlreadyProcessedException } from 'common/exception-filter/exception/common/alreadyProcessed.exception';
import { AnalysisService } from '../analysis.service';
import { ReadDiaryDto } from '../repository/DTO/readDiary.dto';

/*
status 'loading'으로 UPDATE, 요약 job 생성
*/
@Injectable()
export class RetrySummaryService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly analysisService: AnalysisService,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(RetrySummaryService.name);
  }

  async retrySummary(userId: string, diaryId: number): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let foundDiary: ReadDiaryDto;

    try {
      foundDiary = await this.diaryRepository.findDiary(diaryId, queryRunner);

      if (!foundDiary || foundDiary.userId !== userId) {
        throw new ResourceNotFoundException();
      }
      if (foundDiary.status !== DiaryStatus.FAILED) {
        // 이미 진행중이거나 완료된 작업
        throw new AlreadyProcessedException();
      }

      await this.diaryRepository.updateDiarySummaryToLoading(
        diaryId,
        queryRunner,
      );
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    // 댓글 분석 요청(job queue 등록)
    this.analysisService.addJob(diaryId, userId);

    return 'complete';
  }
}
