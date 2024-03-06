import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { User } from '../repository/entity/user.entity';
import { IUserRepository } from '../repository/DAO/user.repository';

@Injectable()
export class UserGetCurrentService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserGetCurrentService.name);
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
