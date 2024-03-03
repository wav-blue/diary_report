import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../repository/DTO/loginUser.dto';
import { User } from '../repository/entity/user.entity';
import { AccessTokenService } from 'src/auth/service/accessToken.service';
import { RefreshTokenService } from 'src/auth/service/refreshToken.service';
import { IUserRepository } from '../repository/DAO/user.repository';

@Injectable()
export class UserLoginService {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
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
    const { newAccessToken } = await this.accessTokenService.createAccessToken(
      findUser.userId,
      findUser.userName,
    );
    const { refreshToken } =
      await this.refreshTokenService.createRefreshToken();

    // 반환할 loginuser 객체
    const loginUser = {
      accessToken: newAccessToken,
      refreshToken,
      userId: findUser.userId,
      userName: findUser.userName,
    };

    return loginUser;
  }
}
