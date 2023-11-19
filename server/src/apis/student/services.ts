import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../errors';
import { cloudinary, database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/response';
import { validator } from '../../utils/validate';

const studentProfileDataIncludeSchema = {
  profileImage: true,
  studentAuth: {
    select: {
      isVerified: true,
      email: true
    }
  }
};

/**
 * ________________________________________________________________
 * @route api/v1/student
 * @method GET
 * @access protected
 * ________________________________________________________________
 */
async function findStudent(req: Request, res: Response) {
  const studentId = req.auth?.id;

  const studentProfile = await database.studentProfile.findUnique({
    where: { studentAuthId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentProfile) {
    throw new NotFoundError('Sie sind nicht registriert');
  }

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, '', studentProfile));
}

/**
 * ________________________________________________________________
 * @route api/v1/student
 * @method PATCH
 * @access protected
 * ________________________________________________________________
 */
async function updateStudent(req: Request, res: Response) {
  const studentId = req.auth?.id;
  let { nickName } = req.body;

  nickName = validator.max('Nickname', nickName, 15);

  const updatedStudent = await database.studentProfile.update({
    where: { studentAuthId: studentId },
    data: { nickName },
    include: studentProfileDataIncludeSchema
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Änderungen gespeichert', updatedStudent));
}

/**
 * ________________________________________________________________
 * @route api/v1/student
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function deleteStudent(req: Request, res: Response) {
  const studentId = req.auth?.id;

  const studentProfile = await database.studentProfile.findUnique({
    where: { studentAuthId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentProfile) {
    throw new NotFoundError('Sie sind nicht registriert');
  }

  const profileImagePublicId = studentProfile?.profileImage?.publicId;

  if (profileImagePublicId) {
    await cloudinary.uploader.destroy(profileImagePublicId);
  }

  await database.studentAuth.delete({
    where: { id: studentId }
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Schade, dass Sie gehen! Wir vermissen Sie bereits'));
}

/**
 * ________________________________________________________________
 * @route api/v1/student/image
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function uploadStudentProfileImage(req: Request, res: Response) {
  const studentId = req.auth?.id;
  const imageSource = req.file?.path;

  if (!imageSource) {
    throw new BadRequestError('Kein Bild zum Hochladen');
  }

  const studentProfile = await database.studentProfile.findUnique({
    where: { studentAuthId: studentId },
    include: studentProfileDataIncludeSchema
  });

  const imageId = studentProfile?.profileImage?.publicId;

  if (imageId) {
    await cloudinary.uploader.destroy(imageId);
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(imageSource, {
    folder: 'iu-quiz-app',
    unique_filename: true,
    resource_type: 'auto',
    allowed_formats: ['png', 'jpg']
  });

  const updatedStudent = await database.studentProfile.update({
    where: { studentAuthId: studentId },
    data: {
      profileImage: {
        update: {
          publicId: public_id,
          url: secure_url
        }
      }
    },
    include: studentProfileDataIncludeSchema
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Profilbild erfolgreich hochgeladen', updatedStudent));
}

/**
 * ________________________________________________________________
 * @route api/v1/student/image
 * @method DELETE
 * @access protected
 * ________________________________________________________________
 */
async function deleteStudentProfileImage(req: Request, res: Response) {
  const studentId = req.auth?.id;

  const studentProfile = await database.studentProfile.findFirst({
    where: { studentAuthId: studentId },
    include: {
      profileImage: true
    }
  });

  const publicId = studentProfile?.profileImage?.publicId;

  if (!publicId) {
    throw new BadRequestError('Kein Bild zum Löschen');
  }

  await cloudinary.uploader.destroy(publicId);

  const updatedStudent = await database.studentProfile.update({
    where: { studentAuthId: studentId },
    data: {
      profileImage: {
        update: {
          publicId: '',
          url: ''
        }
      }
    },
    include: studentProfileDataIncludeSchema
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Profilbild erfolgreich gelöscht', updatedStudent));
}

export {
  findStudent,
  updateStudent,
  deleteStudent,
  uploadStudentProfileImage,
  deleteStudentProfileImage
};
