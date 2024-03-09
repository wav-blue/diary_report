import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { IVirtualAccountRepository } from '../repository/DAO/virtualAccount.repository';
import { CreateVirtualAccountDto } from '../repository/DTO/CreateVirtualAccountOrder.dto';
import { QueryRunner } from 'typeorm';

@Injectable()
export class VirtualAccountCreateService {
  constructor(
    private virtualAccountRepository: IVirtualAccountRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext(VirtualAccountCreateService.name);
  }

  async createVirtualAccount(
    createVirtualAccountDto: CreateVirtualAccountDto,
    orderId: string,
    queryRunner: QueryRunner,
  ) {
    const result = this.virtualAccountRepository.createVirtualAccount(
      createVirtualAccountDto,
      orderId,
      queryRunner,
    );

    return result;
  }
}
