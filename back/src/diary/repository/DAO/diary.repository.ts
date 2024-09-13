import { QueryRunner } from 'typeorm';
import { Diary } from '../entity/diary.entity';
import { CreateDiaryDto } from '../DTO/createDiary.dto';
import { ReadDiaryDto } from '../DTO/readDiary.dto';

export abstract class IDiaryRepository {
  abstract createDiary(
    createDiaryDto: CreateDiaryDto,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Diary>;

  abstract readUserDiary(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Diary[]>;

  abstract updateSummary(
    diaryId: number,
    summary: string,
    queryRunner: QueryRunner,
  ): Promise<string>;

  abstract findDiary(
    diaryId: number,
    queryRunner: QueryRunner,
  ): Promise<ReadDiaryDto>;

  abstract deleteDiary(
    diaryId: number,
    queryRunner: QueryRunner,
  ): Promise<string>;

  abstract updateDiarySummaryToFailed(
    diaryId: number,
    queryRunner: QueryRunner,
  ): Promise<string>;

  abstract updateDiarySummaryToLoading(
    diaryId: number,
    queryRunner: QueryRunner,
  ): Promise<string>;
}
