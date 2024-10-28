import { HttpException } from '@nestjs/common';
/**
 * 유효하지 않은 JWT 토큰
 */
export class MalformedTokenException extends HttpException {
  constructor() {
    super(
      // response
      'Malformed Token',
      // status
      401,
    );
  }
}
