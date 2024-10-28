import { HttpException, HttpStatus } from '@nestjs/common';
/**
 * 로그인이 필요한 상황(로그인 정보가 존재하지 않음)
 */
export class LoginRequiredException extends HttpException {
  constructor() {
    super(
      // response
      'Login required',
      // status
      HttpStatus.UNAUTHORIZED, // 401
    );
  }
}
