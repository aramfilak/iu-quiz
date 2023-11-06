import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';
import { Response, Request, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      auth?: { id: string };
    }
  }
}

function authenticate(req: Request, res: Response, next: NextFunction) {
  let accessToken = req.cookies.access_token;

  if (!accessToken || !accessToken.startsWith('Bearer ')) {
    throw new UnauthorizedError('Student nicht autorisiert');
  }

  accessToken = accessToken.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;

    req.auth = { id: decoded.id };

    next();
  } catch (error) {
    return next(new UnauthorizedError('Student nicht autorisiert'));
  }
}

export { authenticate };
