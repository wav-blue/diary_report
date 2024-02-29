import { Module } from '@nestjs/common';
import { AxiosRequestService } from './axiosRequest.service';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [HttpModule, LoggerModule],
  providers: [AxiosRequestService],
  exports: [AxiosRequestService],
})
export class AxiosRequestModule {}
