import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAccessDeniedException extends HttpException {
  constructor() {
    super(
      // response
      'Access denied',
      // status
      HttpStatus.UNAUTHORIZED, // 401
    );
  }
}
