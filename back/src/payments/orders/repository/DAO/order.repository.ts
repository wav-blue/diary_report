import { QueryRunner } from 'typeorm';
import { CreateOrderDto } from '../DTO/CreateOrder.dto';
import { Order } from '../entity/order.entity';
import { UpdateOrderCompleteDto } from '../DTO/UpdateOrderComplete.dto';

export abstract class IOrderRepository {
  abstract createOrder(
    createOrderDto: CreateOrderDto,
    orderId: string,
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

  abstract findOrderByOrderId(
    orderId: string,
    queryRunner: QueryRunner,
  ): Promise<Order>;

  abstract updateOrder(
    updateOrderCompleteDto: UpdateOrderCompleteDto,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<string>;
}
