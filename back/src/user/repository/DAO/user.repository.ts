import { CreateUserDto } from '../DTO/createUser.dto';
import { User } from '../entity/user.entity';
import { QueryRunner } from 'typeorm';

export abstract class IUserRepository {
  abstract createUser(
    createUserDto: CreateUserDto,
    queryRunner: QueryRunner,
  ): Promise<User>;

  abstract findUserByEmail(
    email: string,
    queryRunner: QueryRunner,
  ): Promise<User>;

  abstract findUserByUserId(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<User>;

  abstract findCustomerKey(
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<string>;

  abstract updateCustomerKey(
    userId: string,
    customerKey: string,
    queryRunner: QueryRunner,
  ): Promise<string>;
}
