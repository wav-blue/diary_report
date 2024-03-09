import { Controller, Param, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/authGuard';
import { MyLogger } from 'src/logger/logger.service';
import { GetUser } from 'common/decorator/get-user.decorator';
import { VirtualAccount } from './repository/entity/virtualAccount.entity';
import { VirtualAccountReadService } from './service/virtualAccountRead.service';
import { BillingCard } from './repository/entity/billingCard.entity';
import { BillingCardReadService } from './service/billingCardRead.service';

@Controller('billing')
@ApiTags('결제 수단 관련 API(세부 결제 내용)')
export class BillingController {
  constructor(
    private readonly virtualAccountReadService: VirtualAccountReadService,
    private readonly billingCardReadService: BillingCardReadService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(BillingController.name);
  }

  @UseGuards(AuthGuard)
  @Get('/:orderId/virtualAccount')
  @ApiOperation({
    summary: '해당 주문의 가상 계좌 조회',
    description:
      'orderId를 파라미터로 받아 해당 주문의 가상 계좌 정보를 return',
  })
  async getVirtualAccountByOrderId(
    @GetUser() userId: string,
    @Param('orderId') orderId: string,
  ): Promise<VirtualAccount> {
    const body = await this.virtualAccountReadService.readVirtualAccount(
      userId,
      orderId,
    );
    return body;
  }

  @UseGuards(AuthGuard)
  @Get('/:orderId/billingCard')
  @ApiOperation({
    summary: '해당 주문의 가상 계좌 조회',
    description:
      'orderId를 파라미터로 받아 해당 주문의 가상 계좌 정보를 return',
  })
  async getBillingCardByOrderId(
    @GetUser() userId: string,
    @Param('orderId') orderId: string,
  ): Promise<BillingCard> {
    const body = await this.billingCardReadService.readBillingCard(
      userId,
      orderId,
    );
    return body;
  }
}
