import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { User } from '../repository/entity/user.entity';
import { IUserRepository } from '../repository/DAO/user.repository';
import { ReadCurrentUserDto } from '../repository/DTO/readCurrentUser.dto';

@Injectable()
export class UserGetCurrentService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserGetCurrentService.name);
  }

  async getCurrentUserById(userId: string): Promise<ReadCurrentUserDto> {
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
    const readCurrentUserDto = new ReadCurrentUserDto(
      foundUser.userId,
      foundUser.userName,
    );

    return readCurrentUserDto;
  }
}
