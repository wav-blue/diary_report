import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { CraeteBillingCardDto } from '../repository/DTO/CraeteBillingCard.dto';
import { IBillingCardRepository } from '../repository/DAO/billingCard.repository';

@Injectable()
export class BillingCardCreateService {
  constructor(
    private billingCardRepository: IBillingCardRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext(BillingCardCreateService.name);
  }

  async createBillingCard(
    createBillingCardDto: CraeteBillingCardDto,
    orderId: string,
    queryRunner: QueryRunner,
  ) {
    const result = this.billingCardRepository.createBillingCard(
      createBillingCardDto,
      orderId,
      queryRunner,
    );

    return result;
  }
}
