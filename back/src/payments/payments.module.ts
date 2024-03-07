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

@Module({
  imports: [AuthModule, UserModule, TitleModule, LoggerModule],
  providers: [
    OrderCreateService,
    { provide: IOrderRepository, useClass: OrderRepository },
    { provide: ICustomerRepository, useClass: CustomerRepository },
  ],
  controllers: [PaymentsController, OrderController],
})
export class PaymentsModule {}
