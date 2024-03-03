import { CreateTitleDto } from '../DTO/createTitle.dto';
import { CreateUserDto } from '../DTO/createUser.dto';
import { Title } from '../entity/title.entity';
import { User } from '../entity/user.entity';
import { QueryRunner } from 'typeorm';

// 추상 클래스 사용
// 알기 쉽도록
// 다른 DB를 동시에 사용하는 경우 이를 추상화하여 두 개의 Repository 구현 가능
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

  abstract createTitle(
    titleCode: string,
    userId: string,
    queryRunner: QueryRunner,
  ): Promise<string>;

  abstract checkTitle(
    userId: string,
    type: string,
    queryRunner: QueryRunner,
  ): Promise<Title>;
}
