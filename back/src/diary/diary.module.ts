import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { DiaryController } from './diary.controller';
import { DiaryCreateService } from './service/diaryCreate.service';
import { DiaryReadService } from './service/diaryRead.service';
import { AxiosModule } from 'src/axios/axios.module';
import { DiaryDeleteService } from './service/diaryDelete.service';
import { AuthModule } from 'src/auth/auth.module';
import { IDiaryRepository } from './repository/DAO/diary.repository';
import { DiaryRepository } from './repository/DAO/diary.postgresql.repository';
import { BullModule } from '@nestjs/bullmq';
import { AnalysisConsumer } from './analysis.consumer';
import { DiaryUpdateSummaryService } from './service/diaryUpdateSummary.service';
import { DiaryUpdateStatusToFailedService } from './service/diaryUpdateStatusToFailed.service';
import { AnalysisService } from './analysis.service';
import { RetrySummaryService } from './service/retrySummary.service';
import { DiaryUpdateSummaryByUserService } from './service/diaryUpdateSummaryByUser.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'summary',
    }),
    LoggerModule,
    AxiosModule,
    AuthModule,
  ],
  controllers: [DiaryController],
  providers: [
    DiaryCreateService,
    DiaryReadService,
    DiaryDeleteService,
    DiaryUpdateSummaryService,
    DiaryUpdateSummaryByUserService,
    DiaryUpdateStatusToFailedService,
    RetrySummaryService,
    AnalysisConsumer,
    AnalysisService,
    { provide: IDiaryRepository, useClass: DiaryRepository },
  ],
})
export class DiaryModule {}
