import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { database } from './configs';
import { authRouter } from './apis/auth';
import { authRateLimiter, errorHandler, pathNotFound } from './middlewares';
import cookieParser from 'cookie-parser';
import { studentRoutes } from './apis/student';

dotenv.config();
const app = express();

/*
 * SECURITY
 */
app.use(helmet());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true
  })
);

/*
 * REQUEST MIDDLEWARES
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

/*
 * MAIN ROUTES
 */
app.use('/api/v1/auth', authRateLimiter, authRouter);
app.use('/api/v1/student', studentRoutes);

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
