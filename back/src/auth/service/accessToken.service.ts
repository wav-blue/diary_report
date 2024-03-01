import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';

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
    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      expiresIn: '15m',
      secret: process.env.JWT_ACCESS_TOKEN_KEY,
    });

    return { accessToken };
  }

  async validAccessToken(accessToken: string) {
    let res: string;
    try {
      const { userId } = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_KEY,
      });
      res = userId;
    } catch (err) {
      throw new UnauthorizedException('AccessToken Expired');
    }
    return res;
  }

  async extractOldToken(
    oldAccessToken: string,
  ): Promise<{ userId: string; userName: string }> {
    const { userId, userName } = this.jwtService.decode(oldAccessToken);
    return { userId, userName };
  }
}
