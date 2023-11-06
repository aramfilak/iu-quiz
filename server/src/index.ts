import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { database } from './config';
import { authRouter } from './api/auth';
import { errorHandler, pathNotFound } from './middlewares';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

/*
 * REQUEST MIDDLEWARES
 */

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

/*
 * ROUTES
 */
app.use('/api/v1/auth', authRouter);

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
