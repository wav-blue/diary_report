import { QueryRunner } from 'typeorm';
import { BillingCard } from '../entity/billingCard.entity';
import { CraeteBillingCardDto } from '../DTO/CraeteBillingCard.dto';

export abstract class IBillingCardRepository {
  abstract createBillingCard(
    craeteBillingCardDto: CraeteBillingCardDto,
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<BillingCard>;

  abstract findBillingCardByOrderId(
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<BillingCard>;
}
