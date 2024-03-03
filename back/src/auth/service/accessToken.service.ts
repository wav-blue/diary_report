import { BadRequestException, Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenExpiredException } from 'common/exception-filter/exception/access-token-expired.exception';
import { MalformedTokenException } from 'common/exception-filter/exception/malformed-token.exception';

@Injectable()
export class AccessTokenService {
  constructor(
    private jwtService: JwtService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(AccessTokenService.name);
  }

  async createAccessToken(userId: string, userName: string) {
    if (!userId || !userName) {
      throw new BadRequestException('필수 값이 존재하지 않습니다');
    }

    const accessTokenPayload = { userId, userName };
    const newAccessToken = await this.jwtService.signAsync(accessTokenPayload, {
      expiresIn: '15s',
      secret: process.env.JWT_ACCESS_TOKEN_KEY,
    });

    return { newAccessToken };
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

  async extractOldToken(
    oldAccessToken: string,
  ): Promise<{ userId: string; userName: string }> {
    // const { userId, userName } = this.jwtService.decode(oldAccessToken);
    console.log('oldAccessToken 확인: ', oldAccessToken);
    const result = this.jwtService.decode(oldAccessToken);
    console.log('result 확인: ', result);

    const { userId, userName } = this.jwtService.decode(oldAccessToken);
    return { userId, userName };
  }
}
