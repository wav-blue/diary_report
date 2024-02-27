import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from 'common/guards/authGuard';
import { GetUser } from 'common/decorator/get-user.decorator';
import { DiaryCreateService } from './service/diaryCreate.service';
import { DiaryReadService } from './service/diaryRead.service';
import { CreateDiaryDto } from './repository/DTO/createUser.dto';

@Controller('diary')
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
  createUser(@GetUser() userId: string): any {
    this.logger.log(`일기 조회 요청!`);
    const diarys = this.diaryReadService.getDiary(userId);
    return diarys;
  }

  @Post('/:userId')
  @UseGuards(AuthGuard)
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
  logoutUser(): string {
    return '삭제 완료';
  }
  // 수정
  @Get('/:userId/:diaryId')
  @UseGuards(AuthGuard)
  async currentUser(@GetUser() userId: string) {
    return '수정완료';
  }
}
