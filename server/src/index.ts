import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
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

app.get('/users', async (req: Request, res: Response) => {});

app.post('/users', async (req: Request, res: Response) => {});

/*
 * ERROR HANDLER
 */

/*
 * MAIN FUNCTION
 */
(async function main() {
  const port = 4000;
  try {
    console.log('  ➜  Data Source has been initialized ✅');

    app.listen(port, () => {
      console.log('  ➜  Server listening on port', port, '🛜');
      console.log('  ➜  Local:', `http://localhost:${port}`);
    });
  } catch (e) {
    console.error('Server Crashed 500 🛑');
    console.error(e);
    process.exit(1);
  }
})();
