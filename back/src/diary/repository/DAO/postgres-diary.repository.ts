import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { CreateDiaryDto } from '../DTO/createDiary.dto';
import { Diary } from '../entity/diary.entity';
import { IDiaryRepository } from './diary.repository';

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

  async updateSummary(
    diaryId: number,
    summary: string,
    queryRunner: QueryRunner,
  ) {
    // await queryRunner.manager.update(diaryId, {
    //   summary,
    // });
    return summary;
  }

  async findDiary(diaryId: number, queryRunner: QueryRunner): Promise<Diary> {
    const diary = await queryRunner.manager
      .createQueryBuilder()
      .select('diary')
      .from(Diary, 'diary')
      .where(`diary.diaryId = :diaryId`, { diaryId })
      .getOne();

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
