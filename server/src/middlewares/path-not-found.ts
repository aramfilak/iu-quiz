import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors';

function pathNotFound(req: Request, res: Response, next: NextFunction) {
  throw new NotFoundError('Path does not exist');
}

export { pathNotFound };
