import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api';
import { StatusCodes } from 'http-status-codes';
import { createErrorResponse } from '../utils/response';
import { Prisma } from '@prisma/client';
import { MulterError } from 'multer';

function errorHandler(e: Error, req: Request, res: Response, next: NextFunction) {
  if (e instanceof ApiError) {
    return res.status(e.statusCode).json(createErrorResponse(e.statusCode, e.message));
  } else if (e instanceof Prisma.PrismaClientValidationError) {
    console.log(e);
    const argument = e.message.split('\n').at(-1)?.split(' ')[2];
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        createErrorResponse(StatusCodes.BAD_REQUEST, `Unbekanntes Argument ${argument}`)
      );
  } else if (e instanceof MulterError && e.code === 'LIMIT_FILE_SIZE') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        createErrorResponse(
          StatusCodes.BAD_REQUEST,
          'Bild zu groß, maximal zulässige Größe 5 MB'
        )
      );
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
}

export { errorHandler };
