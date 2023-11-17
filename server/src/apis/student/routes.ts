import { Router } from 'express';
import { findOne, update, uploadImage, deleteImage } from './services';
import { authenticate, upload } from '../../middlewares';

const studentRoutes = Router();

studentRoutes.get('/', authenticate, findOne);
studentRoutes.patch('/', authenticate, update);
studentRoutes.post('/image', authenticate, upload.single('image'), uploadImage);
studentRoutes.delete('/image', authenticate, deleteImage);

export { studentRoutes };
