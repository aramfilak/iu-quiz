import rateLimit from 'express-rate-limit';
import { ToManyRequestsError } from '../errors';
import { Request, Response } from 'express';

const message = (min: number) =>
  `Zu viele Anfragen. Bitte versuchen Sie es in ${min} Minuten noch einmal.`;

const authRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  limit: 50,
  standardHeaders: 'draft-7',
  skipSuccessfulRequests: true,
  keyGenerator: (req: Request, res: Response) => {
    return req.clientIp!;
  },
  handler: () => {
    throw new ToManyRequestsError(message(10));
  }
});

export { authRateLimiter };
