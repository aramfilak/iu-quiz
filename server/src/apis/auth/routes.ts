import { Router } from 'express';
import { signUp, signIn, verifyEmail } from './services';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/verify-email', verifyEmail);

export { authRouter };
