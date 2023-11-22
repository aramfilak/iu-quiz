import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../../errors';
import { cloudinary, database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/response';
import { validate } from '../../utils/validate';

const studentProfileDataIncludeSchema = {
  profileImage: true,
  student: {
    select: {
      email: true,
      registrationDate: true
    }
  }
};

/**
 * ________________________________________________________________
 * @route api/v1/student/:id
 * @method GET
 * @access protected
 * ________________________________________________________________
 */
async function findStudentById(req: Request, res: Response) {
  const studentId = req.params.studentId;

  const studentProfile = await database.studentProfile.findUnique({
    where: { studentId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentProfile) {
    throw new NotFoundError('Student nicht gefunden');
  }

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, '', studentProfile));
}
/**
 * ________________________________________________________________
 * @route api/v1/student
 * @method GET
 * @access protected
 * ________________________________________________________________
 */
async function findStudent(req: Request, res: Response) {
  const studentId = req.auth?.studentId;

  const studentProfile = await database.studentProfile.findUnique({
    where: { studentId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentProfile) {
    throw new NotFoundError('Student nicht gefunden');
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
  const studentId = req.auth?.studentId;
  let { name } = req.body;

  name = validate.max('name', name, 15);

  const updatedStudent = await database.studentProfile.update({
    where: { studentId: studentId },
    data: { name },
    include: studentProfileDataIncludeSchema
  });

  if (!updatedStudent) {
    throw new NotFoundError('Student nicht gefunden');
  }

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
  const studentId = req.auth?.studentId;

  const studentProfile = await database.studentProfile.findUnique({
    where: { studentId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentProfile) {
    throw new NotFoundError('Student nicht gefunden');
  }

  const profileImagePublicId = studentProfile?.profileImage?.publicId;

  if (profileImagePublicId) {
    await cloudinary.uploader.destroy(profileImagePublicId);
  }

  await database.student.delete({
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
  const studentId = req.auth?.studentId;
  const imageSource = req.file?.path;

  if (!imageSource) {
    throw new BadRequestError('Kein Bild zum Hochladen');
  }

  const studentProfile = await database.studentProfile.findUnique({
    where: { studentId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentProfile) {
    throw new NotFoundError('Student nicht gefunden');
  }

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

  if (!studentProfile.profileImage) {
    await database.profileImage.create({
      data: {
        profileId: studentProfile.id,
        url: '',
        publicId: ''
      }
    });
  }

  const updatedStudent = await database.studentProfile.update({
    where: { studentId: studentId },
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
  const studentId = req.auth?.studentId;

  const studentProfile = await database.studentProfile.findFirst({
    where: { studentId: studentId },
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
    where: { studentId: studentId },
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
  findStudentById,
  updateStudent,
  deleteStudent,
  uploadStudentProfileImage,
  deleteStudentProfileImage
};
