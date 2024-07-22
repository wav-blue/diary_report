import { UpdateOrderCompleteDto } from '../orders/repository/DTO/UpdateOrderComplete.dto';
import { Order } from '../orders/repository/entity/order.entity';

export interface ISuccessPaymentsService {
  // 결제 성공 후, 정보 비교 및 저장
  successPayments(
    userId: string,
    titleId: number,
    updateOrderCompleteDto: UpdateOrderCompleteDto,
  ): Promise<Order>;
}
