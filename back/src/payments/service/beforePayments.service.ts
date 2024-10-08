import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { TitleCheckService } from 'src/title/service/titleCheck.service';
import { CustomerReadService } from '../customer/service/customerRead.service';
import { DuplicatePurchaseReqestException } from 'common/exception-filter/exception/payments/duplicatePurchaseRequest.exception';
import { ReadClientKeyDto } from '../customer/repository/DTO/ReadClientKey.dto';
import { OrderCreateService } from '../orders/service/OrderCreate.service';
import { CreateOrderDto } from '../orders/repository/DTO/CreateOrder.dto';
import { createRandomId } from 'src/user/utils/loginUtils';
import { IBeforePaymentsService } from './beforePayments.interface.service';

@Injectable()
export class BeforePaymentsService implements IBeforePaymentsService {
  constructor(
    private readonly titleCheckService: TitleCheckService,
    private readonly customerReadService: CustomerReadService,
    private readonly orderCreateService: OrderCreateService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(BeforePaymentsService.name);
  }

  async beforePayments(
    userId: string,
    titleId: number,
    createOrderDto: CreateOrderDto,
  ): Promise<ReadClientKeyDto> {
    // 이미 구매한 Title인지 확인
    const result = await this.titleCheckService.checkUserTitle(userId, titleId);
    if (result) {
      throw new DuplicatePurchaseReqestException();
    }

    const orderId = createRandomId();

    // 위조 방지를 위해 사전에 결제 정보 저장
    await this.orderCreateService.createOrder(createOrderDto, orderId, userId);

    const customerKey = await this.customerReadService.getCustomerKey(userId);

    const body = new ReadClientKeyDto(customerKey, orderId);

    return body;
  }
}
