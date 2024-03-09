import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { IVirtualAccountRepository } from '../repository/DAO/virtualAccount.repository';
import { DataSource } from 'typeorm';
import { VirtualAccount } from '../repository/entity/virtualAccount.entity';
import { ResourceNotFoundException } from 'common/exception-filter/exception/common/resource-not-found.exception';

@Injectable()
export class VirtualAccountReadService {
  constructor(
    private virtualAccountRepository: IVirtualAccountRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(VirtualAccountReadService.name);
  }

  async readVirtualAccount(
    userId: string,
    orderId: string,
  ): Promise<VirtualAccount> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let foundVirtualAccount: VirtualAccount;
    try {
      foundVirtualAccount =
        await this.virtualAccountRepository.findVirtualAccountByOrderId(
          orderId,
          queryRunner,
        );

      if (!foundVirtualAccount) {
        throw new ResourceNotFoundException();
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return foundVirtualAccount;
  }
}
