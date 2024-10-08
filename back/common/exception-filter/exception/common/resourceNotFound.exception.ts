import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor() {
    super(
      // response
      'No corresponding resource found',
      // status
      HttpStatus.NOT_FOUND, // 404
    );
  }
}
