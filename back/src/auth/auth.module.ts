import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { RedisService } from './service/redis.service';
import { RedisRepository } from './repository/dao/redis.repository';
import { ValidRefreshTokenService } from './service/validRefreshToken.service';
import { CreateRefreshTokenService } from './service/createRefreshToken.service';
import { ValidAccessTokenService } from './service/validAccessToken.service';
import { CreateAccessTokenService } from './service/createAccessToken.service';
import { ExtractAccessTokenService } from './service/extractOldAccessToken.service';
import { ReissueAccessTokenService } from './service/reissueAccessToken.service';

@Module({
  imports: [
    LoggerModule,
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
  ],
  controllers: [AuthController],
  providers: [
    ValidAccessTokenService,
    CreateAccessTokenService,
    ExtractAccessTokenService,
    ValidRefreshTokenService,
    CreateRefreshTokenService,
    RedisService,
    RedisRepository,
    ReissueAccessTokenService,
  ],
  exports: [
    ValidAccessTokenService,
    CreateRefreshTokenService,
    ReissueAccessTokenService,
    CreateAccessTokenService,
  ],
})
export class AuthModule {}
