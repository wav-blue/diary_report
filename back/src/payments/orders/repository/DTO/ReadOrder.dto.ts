import { IsNotEmpty } from 'class-validator';
import { Order } from '../entity/order.entity';

export class ReadOrderDto {
  constructor(order: Order) {
    this.orderId = order.orderId;
    this.requestedAt = order.requestedAt;
    this.status = order.status;
    this.balanceAmount = order.balanceAmount;
    this.method = order.method;
    this.orderName = order.orderName;
  }

  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  requestedAt: Date;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  balanceAmount: number;

  @IsNotEmpty()
  method: string;

  @IsNotEmpty()
  orderName: string;
}
