import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MyLogger } from 'src/logger/logger.service';
import { CreateOrderDto } from './repository/DTO/CreateOrder.dto';
import { Order } from './repository/entity/order.entity';
import { OrderCreateService } from './service/OrderCreate.service';
import { CreateTitleService } from 'src/title/service/createTitle.service';

@Controller('orders')
@ApiTags('주문 내역 API')
export class OrderController {
  constructor(
    private readonly orderCreateService: OrderCreateService,
    private readonly createTitleService: CreateTitleService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(OrderController.name);
  }
  @Post('/:userId')
  @ApiOperation({
    summary: '결제 성공 처리',
    description: '주문 내역을 데이터베이스에 저장함',
  })
  async successOrderTitle(
    @Param('userId') userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    // 상품 내용 등록
    await this.createTitleService.createTitle(createOrderDto.orderName, userId);

    // 주문 등록
    const newOrder = await this.orderCreateService.createOrder(
      createOrderDto,
      userId,
    );
    return newOrder;
  }
}
