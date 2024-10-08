import { HttpException } from '@nestjs/common';

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
