import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ExtractAccessTokenService {
  constructor(
    private jwtService: JwtService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(ExtractAccessTokenService.name);
  }

  async extractOldToken(
    oldAccessToken: string,
  ): Promise<{ userId: string; userName: string }> {
    // const { userId, userName } = this.jwtService.decode(oldAccessToken);
    this.jwtService.decode(oldAccessToken);

    const { userId, userName } = this.jwtService.decode(oldAccessToken);
    return { userId, userName };
  }
}
