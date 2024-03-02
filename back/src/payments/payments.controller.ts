import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyLogger } from 'src/logger/logger.service';
import { GetUser } from 'common/decorator/get-user.decorator';
import { AuthGuard } from 'src/auth/guards/authGuard';
import { CustomerReadService } from 'src/user/service/customerRead.service';

@Controller('payments')
@ApiTags('결제 API')
export class PaymentsController {
  constructor(
    private readonly customerReadService: CustomerReadService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(PaymentsController.name);
  }

  @UseGuards(AuthGuard)
  @Get('/customer')
  @ApiOperation({
    summary: '결제정보 API',
    description: '결제를 위한 정보(clientKey, customerKey)를 응답',
  })
  async getCustomerKey(@GetUser() userId: string): Promise<{
    widgetClientKey: string;
    customerKey: string;
  }> {
    const widgetClientKey = process.env.PAYMENTS_CLIENT_KEY;
    const customerKey = await this.customerReadService.getCustomerKey(userId);

    const body = {
      widgetClientKey,
      customerKey,
    };
    return body;
  }
}
