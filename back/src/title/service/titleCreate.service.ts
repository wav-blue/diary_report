import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { ITitleRepository } from '../repository/DAO/title.repository';

@Injectable()
export class TitleCreateService {
  constructor(
    private readonly titleRepository: ITitleRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext(TitleCreateService.name);
  }

  async createTitle(titleId: number, userId: string, queryRunner: QueryRunner) {
    this.titleRepository.createTitle(titleId, userId, queryRunner);
    return 'success';
  }
}
