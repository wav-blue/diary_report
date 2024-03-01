import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenService } from './service/accessToken.service';
import { RefreshTokenService } from './service/refreshToken.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    LoggerModule,
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  controllers: [AuthController],
  providers: [AccessTokenService, RefreshTokenService],
  exports: [AccessTokenService, RefreshTokenService],
})
export class AuthModule {}
