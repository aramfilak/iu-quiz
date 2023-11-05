import 'express-async-errors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();
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

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.send(users);
  } catch (e) {
    console.error(e);
  }
});

app.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    console.log(user);
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});

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
    await prisma.$connect();
    console.log('  ➜  Data Source has been initialized ✅');
    app.listen(port, () => {
      console.log('  ➜  Server listening on port', port, '🛜');
      console.log('\x1b[1m', ' ➜  Local:', '\x1b[36m', serverLocal);
    });
  } catch (e) {
    await prisma.$disconnect();
    console.error('\x1b[0;31m', ' ➜  Server error 500 🚨');
    console.error(e);
    process.exit(1);
  }
})();
