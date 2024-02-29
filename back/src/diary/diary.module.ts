import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'src/logger/logger.module';
import { DiaryController } from './diary.controller';
import { DiaryCreateService } from './service/diaryCreate.service';
import { DiaryReadService } from './service/diaryRead.service';
import { IDiaryRepository } from './repository/DAO/diary.dao';
import { DiaryRepository } from './repository/DAO/diary.repository';
import { AxiosRequestModule } from 'src/axiosRequest/axiosRequest.module';

@Module({
  imports: [
    LoggerModule,
    AxiosRequestModule,
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  controllers: [DiaryController],
  providers: [
    DiaryCreateService,
    DiaryReadService,
    { provide: IDiaryRepository, useClass: DiaryRepository },
  ],
})
export class DiaryModule {}
