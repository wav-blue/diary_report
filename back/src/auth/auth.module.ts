import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenService } from './service/accessToken.service';
import { RefreshTokenService } from './service/refreshToken.service';
import { AuthController } from './auth.controller';
import { RedisService } from './service/auth.service';
import { RedisRepository } from './repository/dao/redis.repository';

@Module({
  imports: [
    LoggerModule,
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  controllers: [AuthController],
  providers: [
    AccessTokenService,
    RefreshTokenService,
    RedisService,
    RedisRepository,
  ],
  exports: [AccessTokenService, RefreshTokenService, RedisService],
})
export class AuthModule {}
