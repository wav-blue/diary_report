import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { CreateTitleService } from './service/createTitle.service';
import { CheckTitleService } from './service/checkTitle.service';
import { TitleController } from './title.controller';
import { ITitleRepository } from './repository/DTO/title.repository';
import { TitleRepository } from './repository/DTO/postgres-title.repository';

@Module({
  imports: [LoggerModule],
  controllers: [TitleController],
  providers: [
    CreateTitleService,
    CheckTitleService,
    { provide: ITitleRepository, useClass: TitleRepository },
  ],
  exports: [CreateTitleService, CheckTitleService],
})
export class TitleModule {}
