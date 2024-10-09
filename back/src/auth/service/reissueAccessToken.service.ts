import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { MalformedTokenException } from 'common/exception-filter/exception/user/malformedToken.exception';
import { ExtractAccessTokenService } from 'src/auth/service/extractOldAccessToken.service';
import { CreateAccessTokenService } from 'src/auth/service/createAccessToken.service';
import { ValidRefreshTokenService } from 'src/auth/service/validRefreshToken.service';
import { RedisService } from 'src/auth/service/redis.service';
import { RefreshTokenExpiredException } from 'common/exception-filter/exception/user/refreshTokenExpired.exception';

@Injectable()
export class ReissueAccessTokenService {
  constructor(
    private readonly createAccessTokenService: CreateAccessTokenService,
    private readonly extractAccessTokenService: ExtractAccessTokenService,
    private readonly redisService: RedisService,
    private readonly validRefreshTokenService: ValidRefreshTokenService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(ReissueAccessTokenService.name);
  }

  async reissueAccessToken(oldAccessToken: string): Promise<{
    userId: string;
    userName: string;
    accessToken: string;
  }> {
    let userId: string, userName: string;
    // Extract userId & userName
    try {
      const result =
        await this.extractAccessTokenService.extractOldToken(oldAccessToken);
      userId = result.userId;
      userName = result.userName;
    } catch (err) {
      throw new MalformedTokenException();
    }

    this.logger.info(`User Info`);
    this.logger.info(`- user id: ${userId}`);
    this.logger.info(`- user name: ${userName}`);

    // Check Refresh Token
    const refreshToken = await this.redisService.getValueFromRedis(userId);
    if (!refreshToken) {
      throw new RefreshTokenExpiredException();
    }
    this.logger.verbose('Valid Refresh Token...');
    this.logger.verbose(`- value: ${refreshToken}`);
    this.validRefreshTokenService.validRereshToken(refreshToken); // Refresh Token의 유효기간 검증

    this.logger.verbose('Create Access Token...');
    const { accessToken } =
      await this.createAccessTokenService.createAccessToken(userId, userName);

    return {
      userId,
      userName,
      accessToken,
    };
  }
}
