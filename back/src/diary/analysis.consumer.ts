import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ResourceNotFoundException } from 'common/exception-filter/exception/common/resourceNotFound.exception';
import { IDiaryRepository } from './repository/DAO/diary.repository';
import { DataSource } from 'typeorm';
import { ReadDiaryDto } from './repository/DTO/readDiary.dto';
import { AxiosService } from '../axios/axios.service';
import { DiaryUpdateStatusToFailedService } from './service/diaryUpdateStatusToFailed.service';
import { DiaryUpdateSummaryService } from './service/diaryUpdateSummary.service';

// Consumer
@Processor('summary')
export class AnalysisConsumer extends WorkerHost {
  private readonly logger = new Logger(AnalysisConsumer.name);
  constructor(
    private readonly axiosService: AxiosService,
    private readonly diaryUpdateSummaryService: DiaryUpdateSummaryService,
    private readonly diaryUpdateStatusToFailedService: DiaryUpdateStatusToFailedService,
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  async process(job: Job<{ diaryId: number; userId: string }>): Promise<any> {
    this.logger.debug(`${job.id}번 작업 처리`);

    const { diaryId, userId } = job.data;

    // Create QueryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let diary: ReadDiaryDto;

    try {
      //Find Diary Resource
      diary = await this.diaryRepository.findDiary(diaryId, queryRunner);
      if (!diary) {
        throw new ResourceNotFoundException();
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    let summary: string;

    this.logger.debug('요약 요청 시작');
    // 요약 요청
    const content = diary.content;
    const body = {
      content,
    };
    try {
      summary = await this.axiosService.FlaskRequest(body);

      this.logger.verbose(`Flask 서버로의 요청 성공! ${summary}`);
    } catch (err) {
      this.logger.error('Axios Error 발생');
      this.logger.error(`diaryId: ${diaryId}`);
    }

    if (summary) {
      await this.diaryUpdateSummaryService.updateSummary(
        userId,
        summary,
        diaryId,
      );
    } else {
      await this.diaryUpdateStatusToFailedService.updateDiaryStatusToFailed(
        diaryId,
      );
    }
    this.logger.verbose(`Completed`);
  }
}
