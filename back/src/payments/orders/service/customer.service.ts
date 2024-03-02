import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { CustomerReadService } from 'src/user/service/customerRead.service';

@Injectable()
export class CustomerReadReadService {
  constructor(
    private customerReadService: CustomerReadService,
    private logger: MyLogger,
    private readonly dataSource: DataSource,
  ) {}
}
