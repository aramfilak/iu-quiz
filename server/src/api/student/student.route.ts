import { Router } from 'express';
import { findOne, update } from './student.service';
import { authenticate } from '../../middlewares';

const studentRoute = Router();

studentRoute.get('/', authenticate, findOne);
studentRoute.patch('/', authenticate, update);

export { studentRoute };
