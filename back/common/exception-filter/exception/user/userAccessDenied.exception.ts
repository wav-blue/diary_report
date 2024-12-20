import { HttpException, HttpStatus } from '@nestjs/common';
/**
 * 해당 리소스에 대한 권한 없음(로그인 정보 존재함)
 */
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
