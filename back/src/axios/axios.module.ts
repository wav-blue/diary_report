import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'src/logger/logger.module';
import { AxiosService } from './axios.service';

@Module({
  imports: [HttpModule, LoggerModule],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
