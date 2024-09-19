import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { Order } from '../repository/entity/order.entity';
import { IOrderRepository } from '../repository/DAO/order.repository';
import { UpdateOrderCompleteDto } from '../repository/DTO/UpdateOrderComplete.dto';
import { BalanceAmountNotMatchException } from 'common/exception-filter/exception/payments/balance-amount-not-match.exception';

@Injectable()
export class OrderUpdateCompleteService {
  constructor(
    private orderRepository: IOrderRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext(OrderUpdateCompleteService.name);
  }

  async updateOrderComplete(
    updateOrderCompleteDto: UpdateOrderCompleteDto,
    queryRunner: QueryRunner,
  ): Promise<Order> {
    const { orderId } = updateOrderCompleteDto;

    // 사전에 저장한 주문 정보
    const foundOrder = await this.orderRepository.findOrderByOrderId(
      orderId,
      queryRunner,
    );

    if (foundOrder.balanceAmount !== updateOrderCompleteDto.balanceAmount) {
      this.logger.error(
        `금액이 불일치한 요청\n
        해당 orderId : ${orderId}`,
      );
      this.logger.error('기존 주문 정보\n', foundOrder);
      this.logger.error(
        '수정된 주문 정보\n',
        updateOrderCompleteDto.balanceAmount,
      );
      throw new BalanceAmountNotMatchException();
    }

    await this.orderRepository.updateOrder(
      updateOrderCompleteDto,
      orderId,
      queryRunner,
    );
    return foundOrder;
  }
}
