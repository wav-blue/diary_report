import { Controller, Get, UseGuards } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/authGuard';
import { GetUser } from 'common/decorator/get-user.decorator';
import { TitleGetService } from './service/titleRead.service';
import { ReadTitleDto } from './repository/DTO/ReadTitle.dto';

@Controller('title')
@ApiTags('칭호 API')
export class TitleController {
  constructor(
    private readonly titleGetService: TitleGetService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(TitleController.name);
  }

  @UseGuards(AuthGuard)
  @Get('/my')
  @ApiOperation({
    summary: '칭호 조회',
    description: '유저의 칭호를 조회함',
  })
  async getUserTitle(@GetUser() userId: string): Promise<ReadTitleDto[]> {
    // 주문 내역 조회
    const titles = await this.titleGetService.getUserTitle(userId);
    return titles;
  }
}
