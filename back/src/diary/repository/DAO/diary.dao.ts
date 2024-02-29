import { QueryRunner } from 'typeorm';
import { Diary } from '../entity/diary.entity';
import { CreateDiaryDto } from '../DTO/createDiary.dto';

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

  abstract updateSummary(diaryId: number, summary: string);
}
