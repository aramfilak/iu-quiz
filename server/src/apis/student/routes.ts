import { Router } from 'express';
import {
  findStudent,
  findStudentById,
  updateStudent,
  deleteStudent,
  uploadStudentProfileImage,
  deleteStudentProfileImage
} from './services';
import { upload } from '../../middlewares/multer';

const studentRoutes = Router();

studentRoutes.get('/', findStudent);
studentRoutes.get('/:studentId', findStudentById);
studentRoutes.patch('/', updateStudent);
studentRoutes.delete('/', deleteStudent);
studentRoutes.post('/profile-image', upload.single('image'), uploadStudentProfileImage);
studentRoutes.delete('/profile-image', deleteStudentProfileImage);

export { studentRoutes };
