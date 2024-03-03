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
}
