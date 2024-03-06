import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('title')
@ApiTags('칭호 API')
export class TitleController {
  constructor(private logger: MyLogger) {
    this.logger.setContext(TitleController.name);
  }
}
