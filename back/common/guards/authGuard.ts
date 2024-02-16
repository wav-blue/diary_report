import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { accessToken } = request.signedCookies;
    if (!accessToken) {
      throw new UnauthorizedException('Access Token이 존재하지 않음');
    }
    try {
      const { userId } = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_KEY,
      });
      request.userId = userId;
    } catch (err) {
      throw new UnauthorizedException('Access Token이 만료됨');
    }

    return true;
  }
}
