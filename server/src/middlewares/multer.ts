import multer from 'multer';
import path from 'path';
import { BadRequestError } from '../errors';

const upload = multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const allowedFormat = ['.png', '.jpg', '.jpeg'].some((type) => type === ext);

    if (!allowedFormat) {
      return cb(new BadRequestError(`${ext} ist ein unzulässiges Bildformat`));
    }

    cb(null, true);
  },

  limits: {
    // 5MB
    fileSize: 5 * 1024 * 1024
  }
});

export { upload };
