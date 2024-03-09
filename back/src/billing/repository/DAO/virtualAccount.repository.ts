import { QueryRunner } from 'typeorm';
import { VirtualAccount } from '../entity/virtualAccount.entity';
import { CreateVirtualAccountDto } from '../DTO/CreateVirtualAccountOrder.dto';

export abstract class IVirtualAccountRepository {
  abstract createVirtualAccount(
    createVirtualAccountDto: CreateVirtualAccountDto,
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<VirtualAccount>;

  abstract findVirtualAccountByOrderId(
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<VirtualAccount>;
}
