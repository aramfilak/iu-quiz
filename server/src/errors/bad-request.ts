import { ApiError } from './api';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom error class for handling bad requests (HTTP 400).
 * Extends the base ApiError class.
 */
class BadRequestError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export { BadRequestError };
