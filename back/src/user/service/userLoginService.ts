import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { IUserRepository } from '../DAO/user.dao';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../DTO/loginUser.dto';
import { createAccessToken, createRefreshToken } from '../utils/createToken';

@Injectable()
export class UserLoginService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserLoginService.name);
  }

  async loginUser(loginUserDto: LoginUserDto) {
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
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    const user_data = { user_id: findUser.userId };

    const accessToken = await createAccessToken(user_data, secretKey);
    const refreshToken = await createRefreshToken(secretKey);

    // 반환할 loginuser 객체
    const loginUser = {
      accessToken,
      refreshToken,
      userId: findUser.userId,
      userName: findUser.userName,
    };

    return loginUser;
  }
}
