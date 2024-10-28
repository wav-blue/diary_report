import { HttpException } from '@nestjs/common';
/**
 * Access Token 기한 만료
 */
export class AccessTokenExpiredException extends HttpException {
  constructor() {
    super(
      // response
      'Access Token Expired',
      // status
      419,
    );
  }
}
