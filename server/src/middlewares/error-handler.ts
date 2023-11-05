import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api';
import { StatusCodes } from 'http-status-codes';
import { createErrorResponse } from '../utils';

function errorHandler(e: Error, req: Request, res: Response, next: NextFunction) {
  if (e instanceof ApiError) {
    return res.status(e.statusCode).json(createErrorResponse(e.statusCode, e.message));
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
}

export { errorHandler };
