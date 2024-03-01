import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { Response } from 'express';
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
    @Body('oldAccessToken') oldAccessToken: string,
    @Body('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    // Refresh Token의 유효기간 검증
    await this.refreshTokenService.validRereshToken(refreshToken);

    // Old Access Token에서 userId, userName 추출
    const { userId, userName } =
      await this.accessTokenService.extractOldToken(oldAccessToken);

    this.logger.debug(`추출된 유저 정보 : ${userId}, ${userName}`);

    // Access Token 생성
    const { accessToken } = await this.accessTokenService.createAccessToken(
      userId,
      userName,
    );

    res.cookie('accessToken', accessToken, {
      maxAge: 1 * 60 * 60 * 1000,
      signed: true,
    });
    return '설정 완료';
  }

  @Get('/logout')
  @ApiOperation({
    summary: '로그아웃 API',
    description: '토큰을 파기한다',
  })
  @ApiCreatedResponse({
    description: '요청 완료 메시지',
    schema: {
      example: '로그아웃 완료',
    },
  })
  logoutUser(@Res({ passthrough: true }) res: Response): any {
    // 토큰 파기
    res.cookie('accessToken', null, {
      maxAge: 0,
    });
    res.cookie('refreshToken', null, {
      maxAge: 0,
    });
    return '로그아웃 완료';
  }
}
