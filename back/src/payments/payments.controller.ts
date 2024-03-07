import { Controller, Body, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyLogger } from 'src/logger/logger.service';
import { CreateOrderDto } from './orders/repository/DTO/CreateOrder.dto';
import { Order } from './orders/repository/entity/order.entity';
import { CreateTitleService } from 'src/title/service/createTitle.service';
import { OrderCreateService } from './orders/service/OrderCreate.service';

@Controller('payments')
@ApiTags('결제 API')
export class PaymentsController {
  constructor(
    private readonly orderCreateService: OrderCreateService,
    private readonly createTitleService: CreateTitleService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(PaymentsController.name);
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
    // 주문 등록
    const newOrder = await this.orderCreateService.createOrder(
      createOrderDto,
      userId,
    );

    // 상품 내용 등록(유저 칭호 획득)
    await this.createTitleService.createTitle(createOrderDto.orderName, userId);

    return newOrder;
  }
}
