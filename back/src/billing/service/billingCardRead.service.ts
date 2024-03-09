import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { DataSource } from 'typeorm';
import { IBillingCardRepository } from '../repository/DAO/billingCard.repository';
import { BillingCard } from '../repository/entity/billingCard.entity';
import { ResourceNotFoundException } from 'common/exception-filter/exception/common/resource-not-found.exception';

@Injectable()
export class BillingCardReadService {
  constructor(
    private billingCardRepository: IBillingCardRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(BillingCardReadService.name);
  }

  async readBillingCard(userId: string, orderId: string): Promise<BillingCard> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let foundBillingCard: BillingCard;
    try {
      foundBillingCard =
        await this.billingCardRepository.findBillingCardByOrderId(
          orderId,
          queryRunner,
        );

      if (!foundBillingCard) {
        throw new ResourceNotFoundException();
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return foundBillingCard;
  }
}
