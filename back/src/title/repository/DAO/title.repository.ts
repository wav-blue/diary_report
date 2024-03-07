import { QueryRunner } from 'typeorm';
import { TitleItem } from '../entity/titleItem.entity';

export abstract class ITitleRepository {
  abstract createTitle(
    titleCode: string,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<TitleItem>;

  abstract findUserTitle(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<TitleItem[]>;
}
