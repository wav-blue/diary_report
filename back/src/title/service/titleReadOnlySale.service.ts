import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { ITitleRepository } from '../repository/DAO/title.repository';
import { ReadTitleDto } from '../repository/DTO/ReadTitle.dto';

@Injectable()
export class TitleReadOnlySaleService {
  constructor(
    private readonly titleRepository: ITitleRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(TitleReadOnlySaleService.name);
  }

  async getSaleTitle(): Promise<ReadTitleDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let titles: any[];
    try {
      titles = await this.titleRepository.findSaleTitle(queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    const readTitleDtos = [];
    for (let i = 0; i < titles.length; i++) {
      readTitleDtos.push(new ReadTitleDto(titles[i]));
    }
    return readTitleDtos;
  }
}
