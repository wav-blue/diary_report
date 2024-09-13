import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { CreateDiaryDto } from '../DTO/createDiary.dto';
import { Diary } from '../entity/diary.entity';
import { IDiaryRepository } from './diary.repository';
import { DiaryStatus } from 'src/diary/enum/diaryStatus.enum';
import { ReadDiaryDto } from '../DTO/readDiary.dto';

@Injectable()
export class DiaryRepository implements IDiaryRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(DiaryRepository.name);
  }

  async createDiary(
    createDiaryDto: CreateDiaryDto,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Diary> {
    const newDiary = queryRunner.manager.create(Diary, {
      ...createDiaryDto,
      userId,
      status: DiaryStatus.LOADING,
    });

    const result = await queryRunner.manager.save(newDiary);
    return result;
  }

  async readUserDiary(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Diary[]> {
    const diarys = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from(Diary, 'diary')
      .where(`diary.userId = :userId`, { userId })
      .getRawMany();

    return diarys;
  }

  async updateDiarySummaryToLoading(diaryId: number, queryRunner: QueryRunner) {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Diary)
      .set({ status: DiaryStatus.LOADING })
      .where('diaryId = :diaryId', { diaryId })
      .execute();

    return 'complete';
  }

  async updateSummary(
    diaryId: number,
    summary: string,
    queryRunner: QueryRunner,
  ): Promise<string> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Diary)
      .set({ summary, status: DiaryStatus.COMPLETED })
      .where('diaryId = :diaryId', { diaryId })
      .execute();

    return 'complete';
  }

  async updateDiarySummaryToFailed(diaryId: number, queryRunner: QueryRunner) {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Diary)
      .set({ status: DiaryStatus.FAILED })
      .where('diaryId = :diaryId', { diaryId })
      .execute();

    return 'complete';
  }

  async findDiary(
    diaryId: number,
    queryRunner: QueryRunner,
  ): Promise<ReadDiaryDto> {
    const diary = await queryRunner.manager
      .createQueryBuilder()
      .select('diary')
      .from(Diary, 'diary')
      .where(`diary.diaryId = :diaryId`, {
        diaryId,
      })
      .getOne();

    console.log('diary');
    console.log(diary);
    return diary;
  }

  async deleteDiary(
    diaryId: number,
    queryRunner: QueryRunner,
  ): Promise<string> {
    await queryRunner.manager.softDelete(Diary, {
      diaryId,
    });
    return 'success';
  }
}
