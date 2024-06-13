import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { TitleCreateService } from 'src/title/service/titleCreate.service';
import { OrderUpdateCompleteService } from '../orders/service/orderUpdateComplete.service';
import { UpdateOrderCompleteDto } from '../orders/repository/DTO/UpdateOrderComplete.dto';
import { Order } from '../orders/repository/entity/order.entity';
import { VirtualAccountCreateService } from 'src/billing/service/virtualAccountCreate.service';
import { CreateVirtualAccountDto } from 'src/billing/repository/DTO/CreateVirtualAccountOrder.dto';

@Injectable()
export class SuccessPaymentsWithVirtualAccountService {
  constructor(
    private readonly orderUpdateCompleteService: OrderUpdateCompleteService,
    private readonly titleCreateService: TitleCreateService,
    private readonly virtualAccountCreateService: VirtualAccountCreateService,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(SuccessPaymentsWithVirtualAccountService.name);
  }

  async successPaymentsWithVirtualAccount(
    userId: string,
    titleId: number,
    updateOrderCompleteDto: UpdateOrderCompleteDto,
    createVirtualAccountDto: CreateVirtualAccountDto,
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

      const { orderId } = updateOrderCompleteDto;

      // 가상 계좌 정보 등록
      await this.virtualAccountCreateService.createVirtualAccount(
        createVirtualAccountDto,
        orderId,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return order;
  }
}
