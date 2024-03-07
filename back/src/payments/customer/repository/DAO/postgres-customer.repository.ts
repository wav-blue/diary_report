import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { ICustomerRepository } from './customer.repository';
import { Customer } from '../entity/customer.entity';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(CustomerRepository.name);
  }

  async findCustomerKey(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<string> {
    const found = await queryRunner.manager
      .createQueryBuilder()
      .select('customer')
      .from(Customer, 'customer')
      .where('customer.userId = :userId', { userId })
      .getOne();
    const { customerKey } = found;
    return customerKey;
  }

  async createCustomerKey(
    userId: string,
    customerKey: string,
    queryRunner: QueryRunner,
  ): Promise<Customer> {
    const newCustomerKey = queryRunner.manager.create(Customer, {
      userId,
      customerKey,
    });

    const result = await queryRunner.manager.save(newCustomerKey);
    return result;
  }
}
