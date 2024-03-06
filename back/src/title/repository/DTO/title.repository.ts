import { QueryRunner } from 'typeorm';
import { TitleItem } from '../entity/titleItem.entity';

export abstract class ITitleRepository {
  abstract createTitle(
    titleCode: string,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<TitleItem>;

  abstract checkTitle(
    userId: string,
    type: string,
    queryRunner: QueryRunner,
  ): Promise<TitleItem[]>;
}
