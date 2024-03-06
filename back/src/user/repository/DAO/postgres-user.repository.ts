import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { QueryRunner } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../DTO/createUser.dto';
import { IUserRepository } from './user.repository';

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

  async findCustomerKey(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<string> {
    const found = await queryRunner.manager
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.userId = :userId', { userId })
      .getOne();
    const { customerKey } = found;
    return customerKey;
  }

  async updateCustomerKey(
    userId: string,
    customerKey: string,
    queryRunner: QueryRunner,
  ): Promise<string> {
    // update한다
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ customerKey: customerKey })
      .where('userId = :userId', { userId })
      .execute();

    return 'complete';
  }
}
