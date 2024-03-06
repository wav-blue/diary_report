import { Body, Controller, Get, Post } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenService } from 'src/auth/service/accessToken.service';
import { RefreshTokenService } from './service/refreshToken.service';

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
  @Get('/test')
  test(): any {
    // 토큰 파기
    return '요청 완료';
  }

  @Post('/accessToken')
  @ApiOperation({
    summary: 'Access Token 재발급 API',
    description: '리프레시 토큰을 확인하고 액세스 토큰을 재발급한다',
  })
  @ApiCreatedResponse({
    description: '새롭게 access Token을 쿠키에 설정',
  })
  async createAccessToken(
    @Body('accessToken') accessToken: string,
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ userId: string; userName: string; newAccessToken: string }> {
    console.log('>> ', accessToken, refreshToken);
    // const { accessToken, refreshToken } = refreshAccessTokenDto;
    const oldAccessToken = accessToken;

    // Refresh Token의 유효기간 검증
    this.refreshTokenService.validRereshToken(refreshToken);

    // Old Access Token에서 userId, userName 추출
    const { userId, userName } =
      await this.accessTokenService.extractOldToken(oldAccessToken);

    this.logger.debug(`추출된 유저 정보 : ${userId}, ${userName}`);

    // Access Token 생성
    const newAccessToken = await this.accessTokenService.createAccessToken(
      userId,
      userName,
    )['accessToken'];

    return {
      userId,
      userName,
      newAccessToken,
    };
  }
}
