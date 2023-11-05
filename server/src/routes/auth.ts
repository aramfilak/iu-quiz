import { Router } from 'express';
import { signUp, signIn } from '../services';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);

export { authRouter };
