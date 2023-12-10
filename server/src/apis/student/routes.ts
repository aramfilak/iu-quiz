import { Router } from 'express';
import * as studentServices from './services';
import { profileImageUploader } from '../../middlewares/multer';

const studentRoutes = Router();

studentRoutes.get('/:studentsIds', studentServices.findStudentsByIds);
studentRoutes.patch('/', studentServices.updateStudent);
studentRoutes.delete('/', studentServices.deleteStudent);
studentRoutes.post('/send-email', studentServices.sendContactEmail);
studentRoutes.delete('/profile-image', studentServices.deleteStudentProfileImage);
studentRoutes.post(
  '/profile-image',
  profileImageUploader,
  studentServices.uploadStudentProfileImage
);

export { studentRoutes };
