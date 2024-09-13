import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { MyLogger } from 'src/logger/logger.service';
import { DiaryUpdateStatusToFailedService } from './service/diaryUpdateStatusToFailed.service';

// Producers
@Injectable()
export class AnalysisService {
  constructor(
    @InjectQueue('summary') private readonly summaryQueue: Queue,
    private readonly diaryUpdateStatusToFailedService: DiaryUpdateStatusToFailedService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(AnalysisService.name);
  }

  async addJob(diaryId: number, userId: string): Promise<any> {
    try {
      const job = await this.summaryQueue.add('content-summary', {
        diaryId,
        userId,
      });
      return job.id;
    } catch (err) {
      this.logger.error('job 등록되지 않음');

      // status update(fail)
      this.diaryUpdateStatusToFailedService.updateDiaryStatusToFailed(diaryId);
    }
  }
}
