import { ReadClientKeyDto } from '../customer/repository/DTO/ReadClientKey.dto';
import { CreateOrderDto } from '../orders/repository/DTO/CreateOrder.dto';

export interface IBeforePaymentsService {
  // 사전 결제 정보 저장
  beforePayments(
    userId: string,
    titleId: number,
    createOrderDto: CreateOrderDto,
  ): Promise<ReadClientKeyDto>;
}
