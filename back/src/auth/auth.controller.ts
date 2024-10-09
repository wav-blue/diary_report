import { Controller } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('인증 관련 API')
export class AuthController {
  constructor(private logger: MyLogger) {
    this.logger.setContext(AuthController.name);
  }
}
