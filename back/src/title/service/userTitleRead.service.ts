import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { ITitleRepository } from '../repository/DAO/title.repository';
import { ReadTitleItemDto } from '../repository/DTO/ReadTitleItem.dto';

@Injectable()
export class UserTitleReadService {
  constructor(
    private readonly titleRepository: ITitleRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(UserTitleReadService.name);
  }

  async getUserTitle(userId: string): Promise<ReadTitleItemDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let titles: any[];
    try {
      titles = await this.titleRepository.findTitleItemWithTitle(
        userId,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    const readTitleItemDtos = [];

    for (let i = 0; i < titles.length; i++) {
      readTitleItemDtos.push(new ReadTitleItemDto(titles[i]));
    }
    return readTitleItemDtos;
  }
}
