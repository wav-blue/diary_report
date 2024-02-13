import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { CreateUserDto } from '../DTO/userCreate.dto';
import { QueryRunner } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(UserRepository.name);
  }

  async createUser(
    createUserDto: CreateUserDto,
    queryRunner: QueryRunner,
  ): Promise<any> {
    const newUser = queryRunner.manager.create(User, {
      ...createUserDto,
    });

    const result = await queryRunner.manager.save(newUser);
    return result;
  }
}
