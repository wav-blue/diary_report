import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { ITitleRepository } from '../repository/DAO/title.repository';
import { ReadTitleDto } from '../repository/DTO/ReadTitle.dto';
import { Title } from '../repository/entity/title.entity';

@Injectable()
export class TitleReadService {
  constructor(
    private readonly titleRepository: ITitleRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(TitleReadService.name);
  }

  async getUserTitle(userId: string): Promise<ReadTitleDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let titles: Title[];
    try {
      titles = await this.titleRepository.findUserTitle(userId, queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    let readTitleDtos: ReadTitleDto[];
    for (let i = 0; i < titles.length; i++) {
      readTitleDtos.push(new ReadTitleDto(titles[i]));
    }
    return 'success';
  }
}
