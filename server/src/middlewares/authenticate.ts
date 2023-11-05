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
  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError('Authentication invalid');
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Attach user data to the request object
    req.auth = { id: decoded.id };

    next();
  } catch (error) {
    return next(new UnauthorizedError('Student nicht autorisiert'));
  }
}

export { authenticate };
