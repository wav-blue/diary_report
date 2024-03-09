import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { VirtualAccount } from '../entity/virtualAccount.entity';
import { CreateVirtualAccountDto } from '../DTO/CreateVirtualAccountOrder.dto';
import { IVirtualAccountRepository } from './virtualAccount.repository';

@Injectable()
export class VirtualAccountRepository implements IVirtualAccountRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(VirtualAccountRepository.name);
  }

  async findVirtualAccountByOrderId(
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<VirtualAccount> {
    const found = queryRunner.manager
      .createQueryBuilder()
      .select('A')
      .from(VirtualAccount, 'A')
      .where('A.orderId = :orderId', { orderId })
      .getOne();

    return found;
  }

  async createVirtualAccount(
    createVirtualAccountDto: CreateVirtualAccountDto,
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<VirtualAccount> {
    const newVirtualAccount = queryRunner.manager.create(VirtualAccount, {
      orderId,
      ...createVirtualAccountDto,
    });

    const result = await queryRunner.manager.save(newVirtualAccount);
    return result;
  }
}
