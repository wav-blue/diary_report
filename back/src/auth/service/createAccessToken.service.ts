import { BadRequestException, Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class CreateAccessTokenService {
  constructor(
    private jwtService: JwtService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(CreateAccessTokenService.name);
  }

  async createAccessToken(userId: string, userName: string) {
    if (!userId || !userName) {
      throw new BadRequestException('필수 값이 존재하지 않습니다');
    }

    const accessTokenPayload = { userId, userName };
    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      expiresIn: jwtConfig.accessExpiresIn,
      secret: process.env.JWT_ACCESS_TOKEN_KEY,
    });

    return { accessToken };
  }
}
