import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../repository/DTO/loginUser.dto';
import { User } from '../repository/entity/user.entity';
import { IUserRepository } from '../repository/DAO/user.repository';
import { UserSettingTokenService } from './userSettingToken.service';
import { InvalidLoginDataException } from 'common/exception-filter/exception/user/invalid-login-data.exception';
import { ReadLoginUserDto } from '../repository/DTO/readLoginUser.dto';

@Injectable()
export class UserLoginService {
  constructor(
    private readonly userSettingTokenService: UserSettingTokenService,
    private readonly userRepository: IUserRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserLoginService.name);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<ReadLoginUserDto> {
    const { email, password } = loginUserDto;

    if (!email || !password) {
      throw new BadRequestException('필수 정보가 입력되지 않았습니다.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    let findUser: User;

    try {
      findUser = await this.userRepository.findUserByEmail(email, queryRunner);
      if (!findUser) {
        this.logger.error('검색된 정보 없음');
        throw new ConflictException('가입 이력이 없습니다.');
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    // 비밀번호 확인
    const correctPasswordHash = findUser.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );
    if (!isPasswordCorrect) {
      throw new InvalidLoginDataException();
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const loginData = this.userSettingTokenService.setUserToken(
      findUser.userId,
      findUser.userName,
    );

    return loginData;
  }
}
