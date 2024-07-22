import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccessTokenService } from './service/accessToken.service';
import { RefreshTokenService } from './service/refreshToken.service';
import { MyLogger } from 'src/logger/logger.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenRefreshDto } from './repository/dto/accessTokenRefresh.dto';

@Controller('auth')
@ApiTags('인증 관련 API')
export class AuthController {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Post('/accessToken')
  @ApiOperation({
    summary: 'Access Token 재발급 API',
    description: '리프레시 토큰을 확인하고 액세스 토큰을 재발급한다',
  })
  @ApiCreatedResponse({
    description: '새롭게 access Token을 쿠키에 설정',
  })
  async accessTokenRefresh(
    @Body() accessTokenRefreshDto: AccessTokenRefreshDto,
  ): Promise<{ userId: string; userName: string; accessToken: string }> {
    const oldAccessToken = accessTokenRefreshDto.accessToken;
    const refreshToken = accessTokenRefreshDto.refreshToken;

    // Refresh Token의 유효기간 검증
    this.refreshTokenService.validRereshToken(refreshToken);

    // Old Access Token에서 userId, userName 추출
    const { userId, userName } =
      await this.accessTokenService.extractOldToken(oldAccessToken);

    this.logger.debug(`추출된 유저 정보 : ${userId}, ${userName}`);

    // Access Token 생성
    const { accessToken } = await this.accessTokenService.createAccessToken(
      userId,
      userName,
    );

    return {
      userId,
      userName,
      accessToken,
    };
  }
}
