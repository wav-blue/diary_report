import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { ITitleRepository } from './title.repository';
import { TitleItem } from '../entity/titleItem.entity';

@Injectable()
export class TitleRepository implements ITitleRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(TitleRepository.name);
  }

  async createTitle(
    titleCode: string,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<TitleItem> {
    const newTitle = queryRunner.manager.create(TitleItem, {
      userId,
      titleCode,
    });

    await queryRunner.manager.save(newTitle);
    return newTitle;
  }

  async findUserTitle(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<TitleItem[]> {
    const found = await queryRunner.manager
      .createQueryBuilder()
      .select('title')
      .from(TitleItem, 'title')
      .where('title.userId = :userId', {
        userId,
      })
      .getMany();
    return found;
  }
}
