import { Module } from '@nestjs/common';
// Module import
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BillingModule } from 'src/billing/billing.module';
import { TitleModule } from 'src/title/title.module';
import { LoggerModule } from 'src/logger/logger.module';

// Controller import
import { PaymentsController } from './payments.controller';
import { OrderController } from './orders/order.controller';

// Service import
import { OrderCreateService } from './orders/service/OrderCreate.service';
import { CustomerCreateService } from './customer/service/customerCreate.service';
import { CustomerReadService } from './customer/service/customerRead.service';
import { OrderCheckService } from './orders/service/orderCheck.service';
import { OrderReadService } from './orders/service/orderRead.service';
import { OrderUpdateCompleteService } from './orders/service/orderUpdateComplete.service';

// Repository import
import { IOrderRepository } from './orders/repository/DAO/order.repository';
import { OrderRepository } from './orders/repository/DAO/postgres-order.repository';
import { ICustomerRepository } from './customer/repository/DAO/customer.repository';
import { CustomerRepository } from './customer/repository/DAO/postgres-customer.repository';
import { SuccessPaymentsWithVirtualAccountService } from './service/successPaymentsWithVirtualAccount.service';
import { SuccessPaymentsWithBillingCardService } from './service/successPaymentsWithBillingCard.service';
import { SuccessPaymentsService } from './service/successPayments.service';
import { BeforePaymentsService } from './service/beforePayments.service';

@Module({
  imports: [AuthModule, BillingModule, TitleModule, LoggerModule],
  controllers: [PaymentsController, OrderController],
  providers: [
    OrderCreateService,
    OrderCheckService,
    OrderReadService,
    OrderUpdateCompleteService,
    BeforePaymentsService,
    SuccessPaymentsService,
    SuccessPaymentsWithVirtualAccountService,
    SuccessPaymentsWithBillingCardService,
    CustomerCreateService,
    CustomerReadService,
    { provide: IOrderRepository, useClass: OrderRepository },
    { provide: ICustomerRepository, useClass: CustomerRepository },
  ],
  exports: [],
})
export class PaymentsModule {}
