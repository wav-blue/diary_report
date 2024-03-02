import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MyLogger } from 'src/logger/logger.service';
import { CreateOrderDto } from './repository/DTO/CreateOrder.dto';
import { Order } from './repository/entity/order.entity';
import { OrderCreateService } from './service/OrderCreate.service';

@Controller('orders')
@ApiTags('주문 내역 API')
export class OrderController {
  constructor(
    private readonly orderCreateService: OrderCreateService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(OrderController.name);
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
    const newOrder = await this.orderCreateService.createOrder(
      createOrderDto,
      userId,
    );
    return newOrder;
  }
}
