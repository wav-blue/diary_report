import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { BillingController } from './billing.controller';
import { VirtualAccountCreateService } from './service/virtualAccountCreate.service';
import { BillingCardCreateService } from './service/billingCardCreate.service';
import { VirtualAccountReadService } from './service/virtualAccountRead.service';
import { BillingCardReadService } from './service/billingCardRead.service';
import { IVirtualAccountRepository } from './repository/DAO/virtualAccount.repository';
import { VirtualAccountRepository } from './repository/DAO/postgres-virtual-account.repository';
import { BillingCardRepository } from './repository/DAO/postgres-billing-card.repository';
import { IBillingCardRepository } from './repository/DAO/billingCard.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, LoggerModule],
  controllers: [BillingController],
  providers: [
    BillingCardCreateService,
    BillingCardReadService,
    VirtualAccountCreateService,
    VirtualAccountReadService,
    { provide: IVirtualAccountRepository, useClass: VirtualAccountRepository },
    { provide: IBillingCardRepository, useClass: BillingCardRepository },
  ],
  exports: [BillingCardCreateService, VirtualAccountCreateService],
})
export class BillingModule {}
