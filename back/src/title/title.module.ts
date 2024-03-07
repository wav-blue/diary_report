import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { TitleController } from './title.controller';
import { ITitleRepository } from './repository/DAO/title.repository';
import { TitleRepository } from './repository/DAO/postgres-title.repository';
import { TitleReadService } from './service/titleRead.service';
import { TitleCreateService } from './service/titleCreate.service';

@Module({
  imports: [LoggerModule],
  controllers: [TitleController],
  providers: [
    TitleCreateService,
    TitleReadService,
    { provide: ITitleRepository, useClass: TitleRepository },
  ],
  exports: [TitleCreateService, TitleReadService],
})
export class TitleModule {}
