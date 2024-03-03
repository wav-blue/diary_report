import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessTokenService } from 'src/auth/service/accessToken.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private accessTokenService: AccessTokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers?.authorization) {
      throw new UnauthorizedException('인증 헤더가 존재하지 않습니다.');
    }
    const accessToken = request.headers?.authorization.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Access Token이 존재하지 않음');
    }
    try {
      const userId = this.accessTokenService.validAccessToken(accessToken);
      request.userId = userId;
    } catch (err) {
      throw err;
    }

    return true;
  }
}
