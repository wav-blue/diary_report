import { QueryRunner } from 'typeorm';
import { CreateOrderDto } from '../DTO/CreateOrder.dto';
import { Order } from '../entity/order.entity';
import { CreateVirtualAccountOrderDto } from '../DTO/CreateVirtualAccountOrder.dto';
import { VirtualAccountOrder } from '../entity/virtualAccount.entity';

export abstract class IOrderRepository {
  abstract createOrder(
    createOrderDto: CreateOrderDto,
    userId: string,
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<Order>;

  abstract createVirtualAccountOrder(
    createVirtualAccountOrderDto: CreateVirtualAccountOrderDto,
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<VirtualAccountOrder>;
}