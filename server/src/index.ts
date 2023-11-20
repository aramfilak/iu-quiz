import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { database } from './configs';
import requestIp from 'request-ip';
import { authRateLimiter, standardRateLimiter } from './middlewares/rate-limiters';
import { pathNotFound } from './middlewares/path-not-found';
import { errorHandler } from './middlewares/error-handler';
import { authenticate } from './middlewares/authenticate';
import { studentRoutes } from './apis/student';
import { authRoutes } from './apis/auth';
import { quizRoutes } from './apis/quiz';

const app = express();

/*
 * SECURITY
 */
app.use(requestIp.mw());
app.use(helmet());
app.use(
  cors({
    origin: process.env.ORIGIN
  })
);

/*
 * REQUEST MIDDLEWARES
 */
app.use(morgan('dev'));
app.use(express.json());

/*
 * MAIN ROUTES
 */
app.use('/api/v1/auth', authRateLimiter, authRoutes);
app.use('/api/v1/student', standardRateLimiter, authenticate, studentRoutes);
app.use('/api/v1/quiz', standardRateLimiter, quizRoutes);

/*
 * ERROR HANDLERS
 */
app.use(pathNotFound);
app.use(errorHandler);

/*
 * MAIN FUNCTION
 */
(async function main() {
  const port = 4000;
  const serverLocal = `http://localhost:${port}`;

  try {
    await database.$connect();
    console.info('  ➜  Data Source has been initialized ✅');

    app.listen(port, () => {
      console.info('  ➜  Server listening on port', port, '🛜');
      console.info('\x1b[1m', ' ➜  Local:', '\x1b[36m', serverLocal);
    });
  } catch (e) {
    await database.$disconnect();
    console.error('\x1b[0;31m', ' ➜  Server error 500 🚨');
    console.error(e);
    process.exit(1);
  }
})();
