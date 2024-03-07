import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Order } from '../repository/entity/order.entity';
import { IOrderRepository } from '../repository/DAO/order.repository';

@Injectable()
export class OrderCheckService {
  constructor(
    private orderRepository: IOrderRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(OrderCheckService.name);
  }

  async checkUserOrder(userId: string, orderName: string): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let found: Order;

    try {
      found = await this.orderRepository.findUserIdAndOrderName(
        userId,
        orderName,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    if (found) {
      return true;
    }
    return false;
  }
}
