import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { OrderCreateService } from './orders/service/OrderCreate.service';
import { IOrderRepository } from './orders/repository/DAO/order.repository';
import { OrderRepository } from './orders/repository/DAO/mysql-order.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, LoggerModule],
  providers: [
    OrderCreateService,
    { provide: IOrderRepository, useClass: OrderRepository },
  ],
  controllers: [],
})
export class PaymentsModule {}
