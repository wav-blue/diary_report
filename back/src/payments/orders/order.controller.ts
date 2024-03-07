import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MyLogger } from 'src/logger/logger.service';
import { Get } from '@nestjs/common';
import { ReadOrderDto } from './repository/DTO/readOrder.dto';
import { OrderReadService } from './service/orderRead.service';
import { GetUser } from 'common/decorator/get-user.decorator';

@Controller('orders')
@ApiTags('주문 내역 API')
export class OrderController {
  constructor(
    private readonly orderReadService: OrderReadService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(OrderController.name);
  }

  @Get('/my')
  @ApiOperation({
    summary: '결제 내역 조회',
    description: '유저의 결제 내역을 조회함',
  })
  async getUserOrder(@GetUser() userId: string): Promise<ReadOrderDto[]> {
    // 결제 내역 조회
    const orders = await this.orderReadService.readUserOrder(userId);
    return orders;
  }
}
