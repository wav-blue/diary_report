import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { TitleController } from './title.controller';
import { ITitleRepository } from './repository/DAO/title.repository';
import { TitleCreateService } from './service/titleCreate.service';
import { AuthModule } from 'src/auth/auth.module';
import { TitleReadOnlySaleService } from './service/titleReadOnlySale.service';
import { TitleCheckService } from './service/titleCheck.service';
import { UserTitleReadService } from './service/userTitleRead.service';
import { TitleRepository } from './repository/DAO/title.postgresql.repository';

@Module({
  imports: [AuthModule, LoggerModule],
  controllers: [TitleController],
  providers: [
    TitleCreateService,
    UserTitleReadService,
    TitleReadOnlySaleService,
    TitleCheckService,
    { provide: ITitleRepository, useClass: TitleRepository },
  ],
  exports: [TitleCreateService, TitleCheckService],
})
export class TitleModule {}
