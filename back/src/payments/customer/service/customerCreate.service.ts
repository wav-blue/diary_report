import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from 'src/user/repository/DAO/mysql-user.repository';

@Injectable()
export class CustomerCreateService {
  constructor(
    private userRepository: UserRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(CustomerCreateService.name);
  }

  async createCustomerKey(userId: string) {
    const customerKey = uuidv4();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      this.userRepository.updateCustomerKey(userId, customerKey, queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return customerKey;
  }
}
