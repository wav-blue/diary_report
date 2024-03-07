import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { OrderCreateService } from './orders/service/OrderCreate.service';
import { IOrderRepository } from './orders/repository/DAO/order.repository';
import { PaymentsController } from './payments.controller';
import { OrderController } from './orders/order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TitleModule } from 'src/title/title.module';
import { OrderRepository } from './orders/repository/DAO/postgres-order.repository';
import { ICustomerRepository } from './customer/repository/DAO/customer.repository';
import { CustomerRepository } from './customer/repository/DAO/postgres-customer.repository';
import { CustomerCreateService } from './customer/service/customerCreate.service';
import { CustomerReadService } from './customer/service/customerRead.service';
import { OrderCheckService } from './orders/service/orderCheck.service';
import { OrderReadService } from './orders/service/orderRead.service';
import { SuccessPaymentsForTitleService } from './service/successPaymentsForTitle.service';
import { OrderUpdateCompleteService } from './orders/service/orderUpdateComplete.service';
import { BeforePaymentsForTitleService } from './service/beforePaymentsForTitle.service';

@Module({
  imports: [AuthModule, UserModule, TitleModule, LoggerModule],
  controllers: [PaymentsController, OrderController],
  providers: [
    OrderCreateService,
    OrderCheckService,
    OrderReadService,
    OrderUpdateCompleteService,
    BeforePaymentsForTitleService,
    SuccessPaymentsForTitleService,
    CustomerCreateService,
    CustomerReadService,
    { provide: IOrderRepository, useClass: OrderRepository },
    { provide: ICustomerRepository, useClass: CustomerRepository },
  ],
  exports: [CustomerCreateService, CustomerReadService],
})
export class PaymentsModule {}
