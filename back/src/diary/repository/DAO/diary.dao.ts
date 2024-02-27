import { QueryRunner } from 'typeorm';
import { CreateDiaryDto } from '../DTO/createUser.dto';
import { Diary } from '../entity/diary.entity';

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
}
