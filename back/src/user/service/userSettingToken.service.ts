import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { ReadLoginUserDto } from '../repository/DTO/readLoginUser.dto';
import { CreateRefreshTokenService } from 'src/auth/service/createRefreshToken.service';
import { CreateAccessTokenService } from 'src/auth/service/createAccessToken.service';

@Injectable()
export class UserSettingTokenService {
  constructor(
    private readonly createAccessTokenService: CreateAccessTokenService,
    private readonly createRefreshTokenService: CreateRefreshTokenService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserSettingTokenService.name);
  }

  async setUserToken(
    userId: string,
    userName: string,
  ): Promise<ReadLoginUserDto> {
    // 로그인 성공 -> JWT 웹 토큰 생성
    const { accessToken } =
      await this.createAccessTokenService.createAccessToken(userId, userName);
    const { refreshToken } =
      await this.createRefreshTokenService.createRefreshToken(userId);

    // 반환할 loginuser 객체
    const loginUser = {
      accessToken,
      refreshToken,
      userId,
      userName,
    };

    return loginUser;
  }
}
