import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { MyLogger } from 'src/logger/logger.service';
import { UserService } from './service/user.service';
import { LoginUserDto } from './repository/DTO/loginUser.dto';
import { CreateUserDto } from './repository/DTO/createUser.dto';
import { GetUser } from 'common/decorator/get-user.decorator';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './repository/entity/user.entity';
import { UserLoginService } from './service/userLogin.service';
import { AccessTokenService } from 'src/auth/service/accessToken.service';
import { AuthGuard } from 'src/auth/guards/authGuard';

@Controller('users')
@ApiTags('유저 API')
export class UserController {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly userService: UserService,
    private readonly userLoginService: UserLoginService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(UserController.name);
  }
  // 회원가입
  @Post('/register')
  @ApiOperation({
    summary: '회원가입 API',
    description: '유저 데이터를 생성한다',
  })
  @ApiCreatedResponse({ description: '유저데이터', type: User })
  createUser(@Body() createUserDto: CreateUserDto): any {
    this.logger.log(`회원가입 요청!`);
    const user = this.userService.createUser(createUserDto);
    return user;
  }

  @Post('/login')
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 여부를 확인하고 관련 jwt 토큰 값을 셋팅',
  })
  @ApiCreatedResponse({ description: '로그인된 유저의 데이터' })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    this.logger.log(`로그인 요청!`);
    const user = await this.userLoginService.loginUser(loginUserDto);

    // Token 2개를 쿠키에 설정하는 과정 필요
    const { accessToken, refreshToken } = user;
    this.logger.debug(
      'controller에서 token string 확인 : ',
      accessToken,
      refreshToken,
    );

    return user;
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
    return '로그아웃 완료';
  }

  @Get('/current')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '현재 유저 확인 API',
    description: 'access Token 값에 해당되는 유저 데이터를 반환한다',
  })
  @ApiCreatedResponse({ description: '로그인 유저데이터', type: User })
  async currentUser(
    @GetUser() userId: string,
  ): Promise<{ userId: string; userName: string }> {
    const user = await this.userService.getCurrentUserById(userId);
    const payload = {
      userId,
      userName: user.userName,
    };
    return payload;
  }
}
