import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { ReadLoginUserDto } from '../repository/DTO/readLoginUser.dto';
import { RedisService } from '../../auth/service/redis.service';
import { CreateRefreshTokenService } from 'src/auth/service/createRefreshToken.service';
import { CreateAccessTokenService } from 'src/auth/service/createAccessToken.service';

@Injectable()
export class UserSettingTokenService {
  constructor(
    private readonly createAccessTokenService: CreateAccessTokenService,
    private readonly createRefreshTokenService: CreateRefreshTokenService,
    private readonly redisService: RedisService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserSettingTokenService.name);
  }

  async setUserToken(
    userId: string,
    userName: string,
  ): Promise<ReadLoginUserDto> {
    // 로그인 성공 -> JWT 웹 토큰 생성
    const { accessToken } =
      await this.createAccessTokenService.createAccessToken(userId, userName);
    const { refreshToken } =
      await this.createRefreshTokenService.createRefreshToken();

    this.logger.verbose('Redis에 Refresh Token 값 저장');
    this.redisService.setValueToRedis(userId, refreshToken);
    this.logger.verbose('Complete');

    // 반환할 loginuser 객체
    const loginUser = {
      accessToken,
      refreshToken,
      userId,
      userName,
    };

    return loginUser;
  }
}
