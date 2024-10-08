import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenExpiredException } from 'common/exception-filter/exception/user/refreshTokenExpired.exception';
import { MalformedTokenException } from 'common/exception-filter/exception/user/malformedToken.exception';

@Injectable()
export class ValidRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(ValidRefreshTokenService.name);
  }

  validRereshToken(refreshToken: string) {
    try {
      const verify = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      });
      this.logger.debug('refresh token 검증 완료!');
      return verify;
    } catch (err) {
      if (err.message === 'jwt expired') {
        throw new RefreshTokenExpiredException();
      }
      throw new MalformedTokenException();
    }
  }
}
