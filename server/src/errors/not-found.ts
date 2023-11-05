import { ApiError } from './api';
import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}
