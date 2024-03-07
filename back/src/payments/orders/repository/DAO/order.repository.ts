import { QueryRunner } from 'typeorm';
import { CreateOrderDto } from '../DTO/CreateOrder.dto';
import { Order } from '../entity/order.entity';
import { CreateVirtualAccountOrderDto } from '../DTO/CreateVirtualAccountOrder.dto';
import { VirtualAccountOrder } from '../entity/virtualAccount.entity';

export abstract class IOrderRepository {
  abstract createOrder(
    createOrderDto: CreateOrderDto,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Order>;

  abstract findUserOrder(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<Order[]>;

  abstract findUserIdAndOrderName(
    userId: string,
    orderName: string,
    queryRunner: QueryRunner,
  ): Promise<Order>;

  abstract createVirtualAccountOrder(
    createVirtualAccountOrderDto: CreateVirtualAccountOrderDto,
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<VirtualAccountOrder>;
}
