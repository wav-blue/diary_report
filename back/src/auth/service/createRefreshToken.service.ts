import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { RedisService } from './redis.service';

const jwtConfig = config.get('jwt');

@Injectable()
export class CreateRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(CreateRefreshTokenService.name);
  }

  async createRefreshToken(userId: string) {
    const refreshTokenPayload = {};
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      expiresIn: jwtConfig.refreshExpiresIn,
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
    });

    this.logger.verbose('Redis에 Refresh Token 값 저장');
    this.redisService.setValueToRedis(userId, refreshToken);
    this.logger.verbose('Complete');

    return { refreshToken };
  }
}
