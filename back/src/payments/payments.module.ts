import { Module } from '@nestjs/common';
// Module import
import { AuthModule } from 'src/auth/auth.module';
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
import { SuccessPaymentsService } from './service/successPayments.service';
import { BeforePaymentsService } from './service/beforePayments.service';

// Repository import
import { IOrderRepository } from './orders/repository/DAO/order.repository';
import { ICustomerRepository } from './customer/repository/DAO/customer.repository';
import { CustomerRepository } from './customer/repository/DAO/customer.postgresql.repository';
import { OrderRepository } from './orders/repository/DAO/order.postgresql.repository';

@Module({
  imports: [AuthModule, TitleModule, LoggerModule],
  controllers: [PaymentsController, OrderController],
  providers: [
    OrderCreateService,
    OrderCheckService,
    OrderReadService,
    OrderUpdateCompleteService,
    BeforePaymentsService,
    SuccessPaymentsService,
    CustomerCreateService,
    CustomerReadService,
    { provide: IOrderRepository, useClass: OrderRepository },
    { provide: ICustomerRepository, useClass: CustomerRepository },
  ],
  exports: [],
})
export class PaymentsModule {}
