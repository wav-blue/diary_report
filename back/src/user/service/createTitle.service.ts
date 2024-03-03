import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { IUserRepository } from '../repository/DAO/user.repository';

@Injectable()
export class CreateTitleService {
  constructor(
    private readonly userRepository: IUserRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(CreateTitleService.name);
  }

  async createTitle(titleCode: string, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      this.userRepository.createTitle(titleCode, userId, queryRunner);

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
