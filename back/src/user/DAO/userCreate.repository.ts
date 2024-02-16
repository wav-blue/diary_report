import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { User } from '../entity/user.entity';
import { IUserRepository } from './user.dao';
import { CreateUserDto } from '../DTO/createUser.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private logger: MyLogger) {
    this.logger.setContext(UserRepository.name);
  }

  async createUser(
    createUserDto: CreateUserDto,
    queryRunner: QueryRunner,
  ): Promise<User> {
    const newUser = queryRunner.manager.create(User, {
      ...createUserDto,
    });

    const result = await queryRunner.manager.save(newUser);
    return result;
  }

  async findUserByEmail(
    email: string,
    queryRunner: QueryRunner,
  ): Promise<User> {
    const found = queryRunner.manager
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    return found;
  }

  async findUserByUserId(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<User> {
    const found = queryRunner.manager
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.userId = :userId', { userId })
      .getOne();

    return found;
  }
}
