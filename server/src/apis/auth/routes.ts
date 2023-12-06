import { Router } from 'express';
import { signUp, signIn, verifyEmail } from './services';

const authRoutes = Router();

authRoutes.post('/sign-up', signUp);
authRoutes.post('/sign-in', signIn);
authRoutes.post('/verify-email', verifyEmail);

export { authRoutes };
