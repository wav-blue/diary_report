import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { DiaryController } from './diary.controller';
import { DiaryCreateService } from './service/diaryCreate.service';
import { DiaryReadService } from './service/diaryRead.service';
import { AxiosModule } from 'src/axios/axios.module';
import { DiaryDeleteService } from './service/diaryDelete.service';
import { AuthModule } from 'src/auth/auth.module';
import { IDiaryRepository } from './repository/DAO/diary.repository';
import { DiarySummaryService } from './service/diarySummary.service';
import { DiaryRepository } from './repository/DAO/diary.postgresql.repository';

@Module({
  imports: [LoggerModule, AxiosModule, AuthModule],
  controllers: [DiaryController],
  providers: [
    DiaryCreateService,
    DiaryReadService,
    DiaryDeleteService,
    DiarySummaryService,
    { provide: IDiaryRepository, useClass: DiaryRepository },
  ],
})
export class DiaryModule {}
