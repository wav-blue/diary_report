import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { IDiaryRepository } from '../repository/DAO/diary.repository';
import { ResourceNotFoundException } from 'common/exception-filter/exception/common/resourceNotFound.exception';
import { DiaryStatus } from '../enum/diaryStatus.enum';
import { AlreadyProcessedException } from 'common/exception-filter/exception/common/alreadyProcessed.exception';
import { ReadDiaryDto } from '../repository/DTO/readDiary.dto';

/*
User가 원하는 내용으로 Summary 변경
*/
@Injectable()
export class DiaryUpdateSummaryByUserService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiaryUpdateSummaryByUserService.name);
  }

  async updateSummaryByUser(
    userId: string,
    summary: string,
    diaryId: number,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let foundDiary: ReadDiaryDto;

    try {
      foundDiary = await this.diaryRepository.findDiary(diaryId, queryRunner);

      // 해당하는 일기 존재하지 않음 또는 권한 없는 유저의 요청
      if (!foundDiary || foundDiary.userId !== userId) {
        if (!foundDiary) {
          this.logger.debug(`해당하는 리소스가 존재하지 않음`);
        } else {
          this.logger.debug(`User 불일치 요청`);
          this.logger.debug(`- diary 작성 ID: ${foundDiary.userId}`);
          this.logger.debug(`- 요청 ID: ${userId}`);
        }
        // 보안을 위해 같은 응답
        throw new ResourceNotFoundException();
      }

      if (foundDiary.status == DiaryStatus.LOADING) {
        this.logger.debug(
          `Queue 대기 중인 Diary의 Summary Update 요청\n- diaryId: ${diaryId}`,
        );
        throw new AlreadyProcessedException();
      }

      this.logger.verbose('DB Update 시작');
      await this.diaryRepository.updateSummary(diaryId, summary, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return;
  }
}
