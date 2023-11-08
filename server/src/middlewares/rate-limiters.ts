import rateLimit from 'express-rate-limit';
import { ToManyRequestsError } from '../errors';

const message = (min: number) =>
  `Zu viele Anfragen. Bitte versuchen Sie es in ${min} Minuten noch einmal.`;

const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  limit: 12,
  standardHeaders: 'draft-7',

  handler: () => {
    throw new ToManyRequestsError(message(10));
  }
});

export { authRateLimiter };
