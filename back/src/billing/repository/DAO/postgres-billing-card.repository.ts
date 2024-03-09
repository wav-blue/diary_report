import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { BillingCard } from '../entity/billingCard.entity';
import { CraeteBillingCardDto } from '../DTO/CraeteBillingCard.dto';
import { IBillingCardRepository } from './billingCard.repository';

@Injectable()
export class BillingCardRepository implements IBillingCardRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(BillingCardRepository.name);
  }

  async findBillingCardByOrderId(
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<BillingCard> {
    const found = queryRunner.manager
      .createQueryBuilder()
      .select('card')
      .from(BillingCard, 'card')
      .where('card.orderId = :orderId', { orderId })
      .getOne();
    return found;
  }

  async createBillingCard(
    craeteBillingCardDto: CraeteBillingCardDto,
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<BillingCard> {
    const newBillingCard = queryRunner.manager.create(BillingCard, {
      orderId,
      ...craeteBillingCardDto,
    });

    const result = await queryRunner.manager.save(newBillingCard);
    return result;
  }
}
