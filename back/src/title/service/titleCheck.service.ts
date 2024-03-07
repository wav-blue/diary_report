import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { ITitleRepository } from '../repository/DAO/title.repository';
import { TitleItem } from '../repository/entity/titleItem.entity';

@Injectable()
export class TitleCheckService {
  constructor(
    private readonly titleRepository: ITitleRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(TitleCheckService.name);
  }

  async checkUserTitle(userId: string, titleId: number): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let found: TitleItem;

    try {
      found = await this.titleRepository.checkUserTitleByTitleId(
        userId,
        titleId,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    if (!found) {
      return false;
    }
    return true;
  }
}
