import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Order } from '../repository/entity/order.entity';
import { CreateOrderDto } from '../repository/DTO/CreateOrder.dto';
import { IOrderRepository } from '../repository/DAO/order.repository';

@Injectable()
export class OrderCreateService {
  constructor(
    private orderRepository: IOrderRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(OrderCreateService.name);
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    orderId: string,
    userId: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let result: Promise<Order>;

    try {
      result = this.orderRepository.createOrder(
        createOrderDto,
        orderId,
        userId,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return result;
  }
}
