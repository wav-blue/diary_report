import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/authGuard';
import { MyLogger } from 'src/logger/logger.service';
import { Order } from './orders/repository/entity/order.entity';
import { CreateOrderDto } from './orders/repository/DTO/CreateOrder.dto';
import { OrderCreateService } from './orders/service/OrderCreate.service';
import { TitleCreateService } from 'src/title/service/titleCreate.service';
import { OrderCheckService } from './orders/service/orderCheck.service';
import { CustomerReadService } from './customer/service/customerRead.service';
import { GetUser } from 'common/decorator/get-user.decorator';

@Controller('payments')
@ApiTags('결제 API')
export class PaymentsController {
  constructor(
    private readonly orderCreateService: OrderCreateService,
    private readonly orderCheckService: OrderCheckService,
    private readonly customerReadService: CustomerReadService,
    private readonly titleCreateService: TitleCreateService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(PaymentsController.name);
  }

  @UseGuards(AuthGuard)
  @Get('/customer')
  @ApiOperation({
    summary: '결제정보 API',
    description:
      '결제를 위한 정보(clientKey, customerKey)를 응답. 구매하려는 상품이 이미 구매한 상품일 경우 에러',
  })
  async getPaymentsApiKey(
    @GetUser() userId: string,
    @Query('orderName') orderName: string,
  ): Promise<{
    widgetClientKey: string;
    customerKey: string;
  }> {
    // 이미 구매한 상품인지 확인
    await this.orderCheckService.checkUserOrder(userId, orderName);

    const customerKey = await this.customerReadService.getCustomerKey(userId);
    const widgetClientKey = process.env.PAYMENTS_CLIENT_KEY;
    const secretKey = process.env.PAYMENTS_SECRET_KEY;

    const body = {
      widgetClientKey,
      customerKey,
      secretKey,
    };

    return body;
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
    await this.titleCreateService.createTitle(createOrderDto.orderName, userId);

    return newOrder;
  }
}
