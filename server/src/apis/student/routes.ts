import { Router } from 'express';
import {
  findStudent,
  updateStudent,
  deleteStudent,
  uploadStudentProfileImage,
  deleteStudentProfileImage
} from './services';
import { authenticate, upload } from '../../middlewares';

const studentRoutes = Router();

studentRoutes.get('/', authenticate, findStudent);
studentRoutes.patch('/', authenticate, updateStudent);
studentRoutes.delete('/', authenticate, deleteStudent);
studentRoutes.post(
  '/profile-image',
  authenticate,
  upload.single('image'),
  uploadStudentProfileImage
);
studentRoutes.delete('/profile-image', authenticate, deleteStudentProfileImage);

export { studentRoutes };
