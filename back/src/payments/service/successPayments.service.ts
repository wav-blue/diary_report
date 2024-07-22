import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { TitleCreateService } from 'src/title/service/titleCreate.service';
import { OrderUpdateCompleteService } from '../orders/service/orderUpdateComplete.service';
import { UpdateOrderCompleteDto } from '../orders/repository/DTO/UpdateOrderComplete.dto';
import { Order } from '../orders/repository/entity/order.entity';
import { ISuccessPaymentsService } from './successPayments.interface.service';

@Injectable()
export class SuccessPaymentsService implements ISuccessPaymentsService {
  constructor(
    private readonly orderUpdateCompleteService: OrderUpdateCompleteService,
    private readonly titleCreateService: TitleCreateService,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(SuccessPaymentsService.name);
  }

  async successPayments(
    userId: string,
    titleId: number,
    updateOrderCompleteDto: UpdateOrderCompleteDto,
  ): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let order: Order;
    try {
      // 주문 등록
      order = await this.orderUpdateCompleteService.updateOrderComplete(
        updateOrderCompleteDto,
        queryRunner,
      );

      // 상품 내용 등록(TitleItem 추가)
      await this.titleCreateService.createTitle(titleId, userId, queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return order;
  }
}
