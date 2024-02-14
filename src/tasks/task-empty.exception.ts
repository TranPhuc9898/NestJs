// database-empty.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseEmptyException extends HttpException {
  constructor() {
    super('Hiện tại m', HttpStatus.NOT_FOUND);
  }
}
