import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { Repository, QueryRunner } from 'typeorm';
import { IDiaryRepository } from './diary.dao';
import { CreateDiaryDto } from '../DTO/createDiary.dto';
import { Diary } from '../entity/diary.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  async updateSummary(diaryId: number, summary: string) {
    // await this.diaryRepository.update(diaryId, {
    //   summary,
    // });
    // return summary;
  }
}
