import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { Order } from '../entity/order.entity';
import { CreateOrderDto } from '../DTO/CreateOrder.dto';
import { VirtualAccountOrder } from '../entity/virtualAccount.entity';
import { CreateVirtualAccountOrderDto } from '../DTO/CreateVirtualAccountOrder.dto';
import { IOrderRepository } from './order.repository';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(OrderRepository.name);
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Order> {
    const newOrder = queryRunner.manager.create(Order, {
      userId,
      ...createOrderDto,
    });

    const result = await queryRunner.manager.save(newOrder);
    return result;
  }

  async createVirtualAccountOrder(
    createVirtualAccountOrderDto: CreateVirtualAccountOrderDto,
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<VirtualAccountOrder> {
    const newVirtualAccountOrder = queryRunner.manager.create(
      VirtualAccountOrder,
      { orderId, ...createVirtualAccountOrderDto },
    );

    const result = await queryRunner.manager.save(newVirtualAccountOrder);
    return result;
  }
}