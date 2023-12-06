import { Router } from 'express';
import {
  findStudent,
  findStudentById,
  updateStudent,
  deleteStudent,
  uploadStudentProfileImage,
  deleteStudentProfileImage,
  sendContactEmail
} from './services';
import { profileImageUploader } from '../../middlewares/multer';

const studentRoutes = Router();

studentRoutes.get('/', findStudent);
studentRoutes.get('/:studentId', findStudentById);
studentRoutes.patch('/', updateStudent);
studentRoutes.delete('/', deleteStudent);
studentRoutes.post('/profile-image', profileImageUploader, uploadStudentProfileImage);
studentRoutes.delete('/profile-image', deleteStudentProfileImage);
studentRoutes.post('/send-email', sendContactEmail);

export { studentRoutes };
