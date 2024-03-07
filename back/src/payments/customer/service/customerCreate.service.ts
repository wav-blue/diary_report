import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { v4 as uuidv4 } from 'uuid';
import { ICustomerRepository } from '../repository/DAO/customer.repository';

@Injectable()
export class CustomerCreateService {
  constructor(
    private readonly customerRepository: ICustomerRepository,
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
      this.customerRepository.createCustomerKey(
        userId,
        customerKey,
        queryRunner,
      );

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
