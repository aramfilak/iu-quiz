import { ApiError } from './api';
import { StatusCodes } from 'http-status-codes';

class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
export { UnauthorizedError };
