import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { CustomerCreateService } from './customerCreate.service';
import { ICustomerRepository } from '../repository/DAO/customer.repository';

@Injectable()
export class CustomerReadService {
  constructor(
    private customerCreateService: CustomerCreateService,
    private readonly customerRepository: ICustomerRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(CustomerReadService.name);
  }

  async getCustomerKey(userId: string): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let customerKey: string;

    try {
      customerKey = await this.customerRepository.findCustomerKey(
        userId,
        queryRunner,
      );
      if (!customerKey) {
        this.logger.debug(`customerKey가 없어 새로 생성합니다!`);
        customerKey =
          await this.customerCreateService.createCustomerKey(userId);
      }

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
