import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { createRandomId } from 'src/user/utils/loginUtils';
import { Order } from '../repository/entity/order.entity';
import { CreateOrderDto } from '../repository/DTO/CreateOrder.dto';
import { UserRepository } from 'src/user/repository/DAO/userCreate.repository';
import { PaymentsCreateService } from './paymentsCreate.service';

@Injectable()
export class PaymentsReadService {
  constructor(
    private paymentsCreateService: PaymentsCreateService,
    private userRepository: UserRepository,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {
    this.logger.setContext(PaymentsReadService.name);
  }

  async getCustomerKey가(createOrderDto: CreateOrderDto, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let customerKey가: string;

    try {
      customerKey가 = this.userRepository.getCustomerKey(userId, queryRunner);
      if (!customerKey가) {
        this.logger.log(`customerKey가 없어 새로 생성합니다!`);
        customerKey가 =
          await this.paymentsCreateService.createCustomerKey(userId);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return customerKey가;
  }
}
