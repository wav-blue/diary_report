import { HttpException } from '@nestjs/common';
/**
 * Refresh Token 기한 만료
 */
export class RefreshTokenExpiredException extends HttpException {
  constructor() {
    super(
      // response
      'Refresh Token Expired',
      // status
      419,
    );
  }
}
