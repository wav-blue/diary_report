import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { UserRepository } from '../DAO/user.repository';
import { CreateUserDto } from '../DTO/userCreate.dto';
import { createRandomId, bcryptPassword } from '../utils/loginUtils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    // this.logger.setContext(UserService.name);
  }

  // 추가
  async createUser(createUserDto: CreateUserDto) {
    createUserDto.userId = createRandomId();
    createUserDto.password = await bcryptPassword(createUserDto.password);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let result;

    try {
      result = this.userRepository.createUser(createUserDto, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    // const result = User.createUser({ newUser });
    return result;
  }

  // 유저 정보 조회
  static async getUser(userId: string) {
    // const result = await User.getUser({ user_id });
    const result = { userId: userId, userName: 'test' };
    return result;
  }
  static async getUsernameById(userId: string) {
    const result = { userId: userId, userName: 'test' };
    return result;
  }
}
