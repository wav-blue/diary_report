import { HttpException } from '@nestjs/common';

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
