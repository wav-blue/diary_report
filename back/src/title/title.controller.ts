import { Controller, Get, UseGuards } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/authGuard';
import { GetUser } from 'common/decorator/get-user.decorator';
import { ReadTitleDto } from './repository/DTO/ReadTitle.dto';
import { TitleReadService } from './service/titleRead.service';
import { TitleReadOnlySaleService } from './service/titleReadOnlySale.service';
import { ReadTitleItemDto } from './repository/DTO/ReadTitleItem.dto';

@Controller('title')
@ApiTags('칭호 API')
export class TitleController {
  constructor(
    private readonly titleReadService: TitleReadService,
    private readonly titleReadOnlySaleService: TitleReadOnlySaleService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(TitleController.name);
  }

  @UseGuards(AuthGuard)
  @Get('/my')
  @ApiOperation({
    summary: '유저의 칭호 조회',
    description: '유저가 획득한 칭호를 조회함',
  })
  async getUserTitle(@GetUser() userId: string): Promise<ReadTitleItemDto[]> {
    const titles = await this.titleReadService.getUserTitle(userId);
    return titles;
  }

  @Get('/sale')
  @ApiOperation({
    summary: '판매중인 칭호 정보 조회',
    description: '판매중인 칭호 정보를 조회함',
  })
  async getSaleTitle(): Promise<ReadTitleDto[]> {
    const titles = await this.titleReadOnlySaleService.getSaleTitle();
    return titles;
  }
}
