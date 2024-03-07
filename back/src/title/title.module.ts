import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { TitleController } from './title.controller';
import { ITitleRepository } from './repository/DAO/title.repository';
import { TitleRepository } from './repository/DAO/postgres-title.repository';
import { TitleReadService } from './service/titleRead.service';
import { TitleCreateService } from './service/titleCreate.service';
import { AuthModule } from 'src/auth/auth.module';
import { TitleReadOnlySaleService } from './service/titleReadOnlySale.service';
import { TitleCheckService } from './service/titleCheck.service';

@Module({
  imports: [AuthModule, LoggerModule],
  controllers: [TitleController],
  providers: [
    TitleCreateService,
    TitleReadService,
    TitleReadOnlySaleService,
    TitleCheckService,
    { provide: ITitleRepository, useClass: TitleRepository },
  ],
  exports: [TitleCreateService, TitleReadService, TitleCheckService],
})
export class TitleModule {}
