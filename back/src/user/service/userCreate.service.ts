import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { createRandomId } from '../utils/loginUtils';
import { User } from '../repository/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../repository/DTO/createUser.dto';
import { IUserRepository } from '../repository/DAO/user.repository';
import { UserSettingTokenService } from './userSettingToken.service';
import { ReadLoginUserDto } from '../repository/DTO/readLoginUser.dto';

@Injectable()
export class UserCreateService {
  constructor(
    private readonly userSettingTokenService: UserSettingTokenService,
    private readonly userRepository: IUserRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserCreateService.name);
  }

  private static async bcryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async createUser(createUserDto: CreateUserDto): Promise<ReadLoginUserDto> {
    createUserDto.userId = createRandomId();
    createUserDto.password = await UserCreateService.bcryptPassword(
      createUserDto.password,
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    const { email } = createUserDto;
    let createUser: User;

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

      createUser = await this.userRepository.createUser(
        createUserDto,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const loginData = this.userSettingTokenService.setUserToken(
      createUser.userId,
      createUser.userName,
    );

    return loginData;
  }
}
