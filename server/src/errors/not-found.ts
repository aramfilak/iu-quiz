import { ApiError } from './api';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom error class for handling not found errors (HTTP 404).
 * Extends the base ApiError class.
 * @extends ApiError
 * @public
 */
class NotFoundError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export { NotFoundError };
