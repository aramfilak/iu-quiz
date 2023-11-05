import { ApiError } from './api';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export { BadRequestError };
