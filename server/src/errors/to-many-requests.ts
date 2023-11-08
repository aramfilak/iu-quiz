import { ApiError } from './api';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom error class for handling to many requests errors (HTTP 429).
 * Extends the base ApiError class.
 */
class ToManyRequestsError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.TOO_MANY_REQUESTS, message);
  }
}

export { ToManyRequestsError };
