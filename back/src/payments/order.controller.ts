import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MyLogger } from 'src/logger/logger.service';
import { PaymentsCreateService } from './service/paymentsCreate.service';
import { Order } from './repository/entity/order.entity';
import { CreateOrderDto } from './repository/DTO/CreateOrder.dto';

@Controller('orders')
@ApiTags('주문 내역 API')
export class PaymentsController {
  constructor(
    private readonly paymentsCreateService: PaymentsCreateService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(PaymentsController.name);
  }
  @Post('/:userId')
  @ApiOperation({
    summary: '주문 내역 저장',
    description: '주문 내역을 데이터베이스에 저장함',
  })
  async createOrder(
    @Param('userId') userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const newOrder = await this.paymentsCreateService.createOrder(
      createOrderDto,
      userId,
    );
    return newOrder;
  }
}
