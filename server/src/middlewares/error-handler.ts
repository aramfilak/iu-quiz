import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api';
import { StatusCodes } from 'http-status-codes';
import { createErrorResponse } from '../utils/formatters';
import { Prisma } from '@prisma/client';

function errorHandler(e: Error, req: Request, res: Response, next: NextFunction) {
  if (e instanceof ApiError) {
    return res.status(e.statusCode).json(createErrorResponse(e.statusCode, e.message));
  } else if (e instanceof Prisma.PrismaClientValidationError) {
    const argument = e.message.split('\n').at(-1)?.split(' ')[2];
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorResponse(StatusCodes.BAD_REQUEST, `Unbekanntes Argument ${argument}`));
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
}

export { errorHandler };
