import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { PaymentsController } from './payments.controller';
import { OrderCreateService } from './service/OrderCreate.service';

@Module({
  imports: [LoggerModule],
  providers: [OrderCreateService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
