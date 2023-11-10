import { Router } from 'express';
import { signUp, signIn, signOut } from './services';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

export { authRouter };
