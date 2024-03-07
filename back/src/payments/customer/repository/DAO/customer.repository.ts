import { Customer } from '../entity/customer.entity';
import { QueryRunner } from 'typeorm';

export abstract class ICustomerRepository {
  abstract findCustomerKey(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<string>;

  abstract createCustomerKey(
    userId: string,
    customerKey: string,
    queryRunner: QueryRunner,
  ): Promise<Customer>;
}
