import { Router } from 'express';
import { findOne, update, uploadImage } from './services';
import { authenticate, upload } from '../../middlewares';

const studentRoutes = Router();

studentRoutes.get('/', authenticate, findOne);
studentRoutes.patch('/', authenticate, update);
studentRoutes.post('/upload-image', authenticate, upload.single('image'), uploadImage);

export { studentRoutes };
