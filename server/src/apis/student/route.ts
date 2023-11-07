import { Router } from 'express';
import { findOne, update } from './service';
import { authenticate } from '../../middlewares';

const studentRoutes = Router();

studentRoutes.get('/', authenticate, findOne);
studentRoutes.patch('/', authenticate, update);

export { studentRoutes };
