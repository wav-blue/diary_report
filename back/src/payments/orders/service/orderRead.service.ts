import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Order } from '../repository/entity/order.entity';
import { IOrderRepository } from '../repository/DAO/order.repository';
import { ReadOrderDto } from '../repository/DTO/readOrder.dto';

@Injectable()
export class OrderReadService {
  constructor(
    private orderRepository: IOrderRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(OrderReadService.name);
  }

  async readUserOrder(userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let orders: Order[];

    try {
      orders = await this.orderRepository.findUserOrder(userId, queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    const readOrderDtos = [];

    for (let i = 0; i < orders.length; i++) {
      readOrderDtos.push(new ReadOrderDto(orders[i]));
    }
    return readOrderDtos;
  }
}
