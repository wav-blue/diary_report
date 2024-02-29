import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from 'common/guards/authGuard';
import { GetUser } from 'common/decorator/get-user.decorator';
import { DiaryCreateService } from './service/diaryCreate.service';
import { DiaryReadService } from './service/diaryRead.service';
import { CreateDiaryDto } from './repository/DTO/createDiary.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Diary } from './repository/entity/diary.entity';

@Controller('diary')
@ApiTags('일기 관련 API')
export class DiaryController {
  constructor(
    private diaryCreateService: DiaryCreateService,
    private diaryReadService: DiaryReadService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiaryController.name);
  }
  // 해당 유저의 일기 전체 조회
  @Get('/my')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '유저의 일기 전체 조회 API',
    description: 'Access Token에 해당하는 유저의 일기 전체 조회',
  })
  @ApiCreatedResponse({ description: '일기 데이터', type: Diary })
  createUser(@GetUser() userId: string): any {
    this.logger.log(`일기 조회 요청!`);
    const diarys = this.diaryReadService.getDiary(userId);
    return diarys;
  }

  @Post('/:userId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '일기 작성 API',
    description: '유저의 일기 데이터 생성',
  })
  @ApiCreatedResponse({ description: '일기 데이터', type: Diary })
  async createDiary(
    @GetUser() userId: string,
    @Body() createDiaryDto: CreateDiaryDto,
  ) {
    this.logger.log(`일기작성 요청!`);
    const diary = await this.diaryCreateService.createDiary(
      createDiaryDto,
      userId,
    );
    return diary;
  }

  @Delete('/:userId')
  @ApiOperation({
    summary: '일기 삭제 API',
    description: '유저의 해당 일기 삭제',
  })
  @ApiCreatedResponse({ description: '일기 데이터', type: Diary })
  logoutUser(): string {
    return '삭제 완료';
  }
  // 수정
  @Get('/:userId/:diaryId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '일기 수정 API',
    description: '유저의 일기 수정',
  })
  @ApiCreatedResponse({ description: '일기 데이터', type: Diary })
  async currentUser(@GetUser() userId: string) {
    return '수정완료';
  }
}
