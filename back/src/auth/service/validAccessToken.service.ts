import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenExpiredException } from 'common/exception-filter/exception/user/access-token-expired.exception';
import { MalformedTokenException } from 'common/exception-filter/exception/user/malformed-token.exception';

@Injectable()
export class ValidAccessTokenService {
  constructor(
    private jwtService: JwtService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(ValidAccessTokenService.name);
  }

  validAccessToken(accessToken: string) {
    let res: string;
    try {
      const { userId } = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_KEY,
      });
      res = userId;
    } catch (err) {
      if (err.message === 'jwt expired') {
        throw new AccessTokenExpiredException();
      }
      throw new MalformedTokenException();
    }
    return res;
  }
}
