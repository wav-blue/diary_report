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
import { GetUser } from 'common/decorator/get-user.decorator';
import { UpdateOrderCompleteDto } from './orders/repository/DTO/UpdateOrderComplete.dto';
import { ReadClientKeyDto } from './customer/repository/DTO/ReadClientKey.dto';
import { CreateOrderDto } from './orders/repository/DTO/CreateOrder.dto';
import { CreateVirtualAccountDto } from 'src/billing/repository/DTO/CreateVirtualAccountOrder.dto';
import { CraeteBillingCardDto } from 'src/billing/repository/DTO/CraeteBillingCard.dto';
import { BeforePaymentsService } from './service/beforePayments.service';
import { SuccessPaymentsService } from './service/successPayments.service';
import { SuccessPaymentsWithVirtualAccountService } from './service/successPaymentsWithVirtualAccount.service';
import { SuccessPaymentsWithBillingCardService } from './service/successPaymentsWithBillingCard.service';

@Controller('payments')
@ApiTags('결제 API')
export class PaymentsController {
  constructor(
    private readonly beforePaymentsService: BeforePaymentsService,
    private readonly successPaymentsService: SuccessPaymentsService,
    private readonly successPaymentsWithVirtualAccountService: SuccessPaymentsWithVirtualAccountService,
    private readonly successPaymentsWithBillingCardService: SuccessPaymentsWithBillingCardService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(PaymentsController.name);
  }

  @UseGuards(AuthGuard)
  @Post('/customer')
  @ApiOperation({
    summary: '결제정보 API',
    description:
      '결제를 위한 정보(clientKey, customerKey)를 응답. 구매하려는 상품이 이미 구매한 상품일 경우 에러',
  })
  async getPaymentsApiKey(
    @GetUser() userId: string,
    @Query('titleId') titleId: number,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<ReadClientKeyDto> {
    const body = this.beforePaymentsService.beforePayments(
      userId,
      titleId,
      createOrderDto,
    );
    return body;
  }

  @Get('/secretKey')
  @ApiOperation({
    summary: '시크릿 키 API',
    description: '백엔드에 저장 중인 toss payments의 Secret Key 값을 응답',
  })
  async getPaymentsSecretKey(): Promise<{
    secretKey: string;
  }> {
    const body = {
      secretKey: process.env.PAYMENTS_SECRET_KEY,
    };
    return body;
  }

  @Post('success/:userId')
  @ApiOperation({
    summary: '결제 성공 처리',
    description: '주문 내역을 데이터베이스에 저장함',
  })
  async successOrderTitle(
    @Param('userId') userId: string,
    @Query('titleId') titleId: number,
    @Body() updateOrderCompleteDto: UpdateOrderCompleteDto,
  ): Promise<Order> {
    const order = await this.successPaymentsService.successPayments(
      userId,
      titleId,
      updateOrderCompleteDto,
    );
    return order;
  }

  @Post('success/:userId/virtualAccount')
  @ApiOperation({
    summary: '가상계좌 결제 임시 성공 처리',
    description: '주문 내역과 가상 계좌 정보를 데이터베이스에 저장함',
  })
  async successOrderTitleWithVirtualAccount(
    @Param('userId') userId: string,
    @Query('titleId') titleId: number,
    @Body('orderJson') updateOrderCompleteDto: UpdateOrderCompleteDto,
    @Body('virtualAccountJson')
    createVirtualAccountDto: CreateVirtualAccountDto,
  ): Promise<Order> {
    const order =
      await this.successPaymentsWithVirtualAccountService.successPaymentsWithVirtualAccount(
        userId,
        titleId,
        updateOrderCompleteDto,
        createVirtualAccountDto,
      );
    return order;
  }
  @Post('success/:userId/billingCard')
  @ApiOperation({
    summary: '카드 결제 성공 처리',
    description: '주문 내역과 결제 카드 정보를 데이터베이스에 저장함',
  })
  async successOrderTitleWithBillingCard(
    @Param('userId') userId: string,
    @Query('titleId') titleId: number,
    @Body('orderJson') updateOrderCompleteDto: UpdateOrderCompleteDto,
    @Body('billingCardJson')
    craeteBillingCardDto: CraeteBillingCardDto,
  ): Promise<Order> {
    const order =
      await this.successPaymentsWithBillingCardService.successPaymentsWithBillingCard(
        userId,
        titleId,
        updateOrderCompleteDto,
        craeteBillingCardDto,
      );
    return order;
  }
}
