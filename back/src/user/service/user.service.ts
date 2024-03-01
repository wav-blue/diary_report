import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { createRandomId } from '../utils/loginUtils';
import { IUserRepository } from '../DAO/user.dao';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../DTO/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserService.name);
  }

  private static async bcryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.userId = createRandomId();
    createUserDto.password = await UserService.bcryptPassword(
      createUserDto.password,
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    const { email } = createUserDto;
    let result: Promise<User>;

    try {
      const findUser = await this.userRepository.findUserByEmail(
        email,
        queryRunner,
      );
      this.logger.debug('findUser ', findUser);
      if (findUser) {
        this.logger.error('이미 가입된 이메일');
        throw new ConflictException('이미 가입 이력이 있습니다.');
      }

      result = this.userRepository.createUser(createUserDto, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  async getUser(userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let foundUser: User;
    try {
      foundUser = await this.userRepository.findUserByUserId(
        userId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return foundUser;
  }
  async getCurrentUserById(
    userId: string,
  ): Promise<{ userId: string; userName: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let foundUser: User;
    try {
      foundUser = await this.userRepository.findUserByUserId(
        userId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    const user = {
      userId,
      userName: foundUser.userName,
    };

    return user;
  }
}
