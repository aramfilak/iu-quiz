import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../errors';
import { cloudinary, database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/formatters';
import { isEmpty } from '../../utils/validators';

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
 * @route api/v1/student
 * @method GET
 * @access protected
 */
async function findOne(req: Request, res: Response) {
  const studentId = req.auth?.id;

  const studentData = await database.studentProfile.findUnique({
    where: { studentAuthId: studentId },
    include: studentProfileDataIncludeSchema
  });

  if (!studentData) {
    throw new NotFoundError('Sie sind nicht registriert');
  }

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, '', studentData));
}

/**
 * @route api/v1/student
 * @method PATCH
 * @access protected
 */
async function update(req: Request, res: Response) {
  const studentId = req.auth?.id;
  const { profileImage, ...updateData } = req.body;
  if (!Object.keys(updateData).length) {
    throw new BadRequestError('Keine Einträge zum Aktualiseren');
  }

  Object.entries(updateData).forEach(([key, value]) => {
    isEmpty(key, value);
  });

  const updatedStudent = await database.studentProfile.update({
    where: { studentAuthId: studentId },
    data: updateData,
    include: studentProfileDataIncludeSchema
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Änderungen gespeichert', updatedStudent));
}

/**
 * @route api/v1/student/image
 * @method POST
 * @access protected
 */
async function uploadImage(req: Request, res: Response) {
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
 * @route api/v1/student/image
 * @method DELETE
 * @access protected
 */
async function deleteImage(req: Request, res: Response) {
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

export { findOne, update, uploadImage, deleteImage };
