import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { ITitleRepository } from './title.repository';
import { TitleItem } from '../entity/titleItem.entity';
import { Title } from '../entity/title.entity';
import { TitleType } from '../enum/titleType.enum';

@Injectable()
export class TitleRepository implements ITitleRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(TitleRepository.name);
  }

  async createTitle(
    titleId: number,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<TitleItem> {
    const newTitleItem = queryRunner.manager.create(TitleItem, {
      userId,
      titleId,
    });

    const result = await queryRunner.manager.save(newTitleItem);
    return result;
  }

  async findTitleItemWithTitle(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Title[]> {
    // subQuery : 유저가 획득한 titleId 목록
    const titleItemQueryBuilder = queryRunner.manager
      .createQueryBuilder(TitleItem, 'TI')
      .select('TI.titleId')
      .where('TI.userId = :userId', { userId });

    const found = await queryRunner.manager
      .createQueryBuilder()
      .select('T.titleId', 'titleId')
      .addSelect('T.titleName', 'titleName')
      .addSelect('T.titleDescription', 'titleDescription')
      .addSelect('T.titleType', 'titleType')
      .addSelect('TI.createdAt', 'createdAt')
      .from(Title, 'T')
      .innerJoin(TitleItem, 'TI', 'TI.titleId = T.titleId')
      .where('TI.userId = :userId', { userId })
      .setParameters(titleItemQueryBuilder.getParameters())
      .orderBy('T.titleId', 'ASC')
      .getRawMany();
    return found;
  }

  async findSaleTitle(queryRunner: QueryRunner): Promise<Title[]> {
    const found = await queryRunner.manager
      .createQueryBuilder()
      .select('title')
      .from(Title, 'title')
      .where('title.titleType = :titleType', {
        titleType: TitleType.SALE,
      })
      .getMany();

    return found;
  }

  async checkUserTitleByTitleId(
    userId: string,
    titleId: number,
    queryRunner: QueryRunner,
  ): Promise<TitleItem> {
    const found = await queryRunner.manager
      .createQueryBuilder()
      .select('item')
      .from(TitleItem, 'item')
      .where('item.userId = :userId and item.titleId = :titleId', {
        userId,
        titleId,
      })
      .getOne();
    return found;
  }
}
