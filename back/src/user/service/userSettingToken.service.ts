import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { AccessTokenService } from 'src/auth/service/accessToken.service';
import { RefreshTokenService } from 'src/auth/service/refreshToken.service';
import { ReadLoginUserDto } from '../repository/DTO/readLoginUser.dto';
import { RedisService } from '../../auth/service/auth.service';

@Injectable()
export class UserSettingTokenService {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
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
    const { accessToken } = await this.accessTokenService.createAccessToken(
      userId,
      userName,
    );
    const { refreshToken } =
      await this.refreshTokenService.createRefreshToken();

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
