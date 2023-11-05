import 'express-async-errors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { database } from './config';

dotenv.config();
const app = express();

/*
 * MIDDLEWARES
 */
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

/*
 * ROUTES
 */

/*
 * ERROR HANDLER
 */

/*
 * MAIN FUNCTION
 */
(async function main() {
  const port = 4000;
  const serverLocal = `http://localhost:${port}`;

  try {
    await database.$connect();
    console.log('  ➜  Data Source has been initialized ✅');
    app.listen(port, () => {
      console.log('  ➜  Server listening on port', port, '🛜');
      console.log('\x1b[1m', ' ➜  Local:', '\x1b[36m', serverLocal);
    });
  } catch (e) {
    await database.$disconnect();
    console.error('\x1b[0;31m', ' ➜  Server error 500 🚨');
    console.error(e);
    process.exit(1);
  }
})();
