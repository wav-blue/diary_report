import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(RefreshTokenService.name);
  }

  async createRefreshToken() {
    const refreshTokenPayload = {};
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      expiresIn: '1h',
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
    });

    return { refreshToken };
  }

  validRereshToken(refreshToken: string) {
    try {
      const verify = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      });
      this.logger.debug('refresh token 검증 완료!');
      return verify;
    } catch (err) {
      throw new UnauthorizedException('RefreshToken Expired');
    }
  }
}
