import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { OrderCreateService } from './orders/service/OrderCreate.service';
import { CustomerCreateService } from './customer/service/customerCreate.service';
import { CustomerReadService } from './customer/service/customerRead.service';
import { CustomerController } from './customer/customer.controller';
import { OrderController } from './orders/order.controller';

@Module({
  imports: [LoggerModule],
  providers: [OrderCreateService, CustomerCreateService, CustomerReadService],
  controllers: [CustomerController, OrderController],
})
export class PaymentsModule {}
