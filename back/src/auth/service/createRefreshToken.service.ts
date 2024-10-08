import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class CreateRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(CreateRefreshTokenService.name);
  }

  async createRefreshToken() {
    const refreshTokenPayload = {};
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      expiresIn: jwtConfig.refreshExpiresIn,
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
    });

    return { refreshToken };
  }
}
