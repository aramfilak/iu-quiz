import rateLimit from 'express-rate-limit';
import { ToManyRequestsError } from '../errors';
import { Request, Response } from 'express';

const LimiterErrorMessage = (min: number) => {
  throw new ToManyRequestsError(
    `Zu viele Anfragen. Bitte versuchen Sie es in ${min} Minuten noch einmal.`
  );
};

const convertMsToMin = (min: number) => min * 60 * 1000;

const userIP = (req: Request, res: Response) => req.clientIp!;

const standardRateLimiter = rateLimit({
  windowMs: convertMsToMin(15),
  limit: 150,
  standardHeaders: 'draft-7',
  skipSuccessfulRequests: true,
  keyGenerator: userIP,
  handler: () => LimiterErrorMessage(15)
});

const authRateLimiter = rateLimit({
  windowMs: convertMsToMin(30),
  limit: 15,
  standardHeaders: 'draft-7',
  skipSuccessfulRequests: true,
  keyGenerator: userIP,
  handler: () => LimiterErrorMessage(30)
});

export { authRateLimiter, standardRateLimiter };
