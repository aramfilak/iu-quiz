import { ApiError } from './api';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom error class for handling unauthorized access errors (HTTP 401).
 * Extends the base ApiError class.
 */
class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export { UnauthorizedError };
