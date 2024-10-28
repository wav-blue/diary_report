import { HttpException } from '@nestjs/common';
/**
 * 로그인을 위한 정보가 불일치함(아이디, 비밀번호 불일치)
 */
export class InvalidLoginDataException extends HttpException {
  constructor() {
    super(
      // response
      'Wrong email or password',
      // status
      401,
    );
  }
}
