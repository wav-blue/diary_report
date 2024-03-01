import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { DiaryController } from './diary.controller';
import { DiaryCreateService } from './service/diaryCreate.service';
import { DiaryReadService } from './service/diaryRead.service';
import { IDiaryRepository } from './repository/DAO/diary.dao';
import { DiaryRepository } from './repository/DAO/diary.repository';
import { AxiosModule } from 'src/axios/axios.module';
import { DiaryDeleteService } from './service/diaryDelete.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [LoggerModule, AxiosModule, AuthModule],
  controllers: [DiaryController],
  providers: [
    DiaryCreateService,
    DiaryReadService,
    DiaryDeleteService,
    { provide: IDiaryRepository, useClass: DiaryRepository },
  ],
})
export class DiaryModule {}
