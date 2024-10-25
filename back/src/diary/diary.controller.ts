import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { GetUser } from 'common/decorator/get-user.decorator';
import { DiaryCreateService } from './service/diaryCreate.service';
import { DiaryReadService } from './service/diaryRead.service';
import { CreateDiaryDto } from './repository/DTO/createDiary.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Diary } from './repository/entity/diary.entity';
import { DiaryDeleteService } from './service/diaryDelete.service';
import { AuthGuard } from 'src/auth/guards/authGuard';
import { RetrySummaryService } from './service/retrySummary.service';
import { DiaryUpdateSummaryByUserService } from './service/diaryUpdateSummaryByUser.service';

@Controller('diary')
@ApiTags('일기 관련 API')
export class DiaryController {
  constructor(
    private diaryCreateService: DiaryCreateService,
    private diaryReadService: DiaryReadService,
    private diaryDeleteService: DiaryDeleteService,
    private retrySummaryService: RetrySummaryService,
    private diaryUpdateSummaryByUserService: DiaryUpdateSummaryByUserService,
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
  createUser(@GetUser() userId: string): Promise<Diary[]> {
    this.logger.log(`일기 조회 요청!`);
    const diarys = this.diaryReadService.getDiary(userId);
    return diarys;
  }

  @Post('/:diaryId/summary')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '일기의 요약 재요청',
    description: '분석 실패한 일기의 요약을 요청하고 수정한다.',
  })
  @ApiCreatedResponse({ description: '일기 데이터', type: Diary })
  @ApiResponse({
    status: 201,
    description: 'Diary Summary Updated',
    type: Diary,
  })
  updateSummary(
    @GetUser() userId: string,
    @Param('diaryId') diaryId: number,
  ): Promise<Diary[]> {
    this.logger.log(`일기 요약 재요청!`);
    this.retrySummaryService.retrySummary(userId, diaryId);
    const diarys = this.diaryReadService.getDiary(userId);
    return diarys;
  }

  @Post('/:diaryId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '일기의 요약 수정 요청',
    description: '분석 성공한 일기의 요약을 수정한다.',
  })
  @ApiCreatedResponse({ description: '일기 데이터', type: Diary })
  @ApiResponse({
    status: 201,
    description: 'Diary Summary Updated By User',
    type: Diary,
  })
  updateSummaryByUser(
    @GetUser() userId: string,
    @Param('diaryId') diaryId: number,
    @Body('summary') summary: string,
  ): Promise<Diary[]> {
    this.logger.log(`일기 요약 내용 수정!`);
    this.diaryUpdateSummaryByUserService.updateSummaryByUser(
      userId,
      summary,
      diaryId,
    );
    const diarys = this.diaryReadService.getDiary(userId);
    return diarys;
  }

  @Post('/:userId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '일기 작성 API',
    description: '유저의 일기 데이터 생성',
  })
  @ApiResponse({
    status: 201,
    description: 'Diary Created',
    type: Diary,
  })
  @ApiCreatedResponse({ description: '일기 데이터', type: Diary })
  async createDiary(
    @Param('userId') userId: string,
    @Body() createDiaryDto: CreateDiaryDto,
  ) {
    this.logger.log(`일기작성 요청!`);
    const diary = await this.diaryCreateService.createDiary(
      createDiaryDto,
      userId,
    );
    return diary;
  }

  @Delete('/:diaryId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '일기 삭제 API',
    description: '유저의 해당 일기 삭제',
  })
  @ApiResponse({
    status: 204,
    description: 'Diary Deleted',
    type: Diary,
  })
  async logoutUser(
    @Param('diaryId') diaryId: number,
    @GetUser() userId: string,
  ): Promise<string> {
    this.logger.log(`일기삭제 요청!`);
    await this.diaryDeleteService.deleteDiary(diaryId, userId);
    return '삭제 완료';
  }
}
