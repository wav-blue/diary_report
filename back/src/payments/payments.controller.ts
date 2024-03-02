import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyLogger } from 'src/logger/logger.service';

@Controller('payments')
@ApiTags('결제 API')
export class PaymentsController {
  constructor(
    private readonly paymentsReadService: PaymentsReadService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(PaymentsController.name);
  }
  @Get('/customer')
  @ApiOperation({
    summary: '결제정보 API',
    description: '결제를 위한 정보(clientKey, customerKey)를 응답',
  })
  getCustomerKey(): { widgetClientKey: string; customerKey: string } {
    const widgetClientKey = process.env.PAYMENTS_CLIENT_KEY;

    const body = {
      widgetClientKey,
      customerKey,
    };
    return body;
  }
}
