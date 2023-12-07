import { Router } from 'express';
import * as authServices from './services';

const authRoutes = Router();

authRoutes.post('/sign-up', authServices.signUp);
authRoutes.post('/sign-in', authServices.signIn);
authRoutes.post('/verify-email', authServices.verifyEmail);

export { authRoutes };
