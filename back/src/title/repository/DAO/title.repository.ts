import { QueryRunner } from 'typeorm';
import { TitleItem } from '../entity/titleItem.entity';
import { Title } from '../entity/title.entity';

export abstract class ITitleRepository {
  abstract createTitle(
    titleId: number,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<TitleItem>;

  abstract findTitleItemWithTitle(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Title[]>;

  abstract checkUserTitleByTitleId(
    userId: string,
    titleId: number,
    queryRunner: QueryRunner,
  ): Promise<TitleItem>;

  abstract findSaleTitle(queryRunner: QueryRunner): Promise<Title[]>;
}
