import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { ITitleRepository } from '../repository/DTO/title.repository';

@Injectable()
export class CheckTitleService {
  constructor(
    private readonly titleRepository: ITitleRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(CheckTitleService.name);
  }

  async checkTitle(userId: string, titleCode: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const result = await this.titleRepository.checkTitle(
        userId,
        titleCode,
        queryRunner,
      );

      if (result) {
        throw new ConflictException('이미 구매 내역이 있는 상품입니다!');
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return 'success';
  }
}
