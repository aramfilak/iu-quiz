import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../errors';
import { cloudinary, database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/formatters';
import { excludeSensitiveProperties } from '../../utils/helpers';
import { isEmpty } from '../../utils/validators';
import { Student } from '@prisma/client';

const excludeStudentSensitiveProperties = (data: Student) =>
  excludeSensitiveProperties(['password', 'emailVerificationToken'], data);

/**
 * @route api/v1/student
 * @method GET
 * @access protected
 */
async function findOne(req: Request, res: Response) {
  const studentId = req.auth?.id;

  const studentData = await database.student.findFirst({
    where: { id: studentId }
  });

  if (!studentData) {
    throw new NotFoundError('Sie sind nicht registriert');
  }

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, '', excludeStudentSensitiveProperties(studentData)));
}

/**
 * @route api/v1/student
 * @method PATCH
 * @access protected
 */
async function update(req: Request, res: Response) {
  const studentId = req.auth?.id;
  const { id, email, password, isVerified, emailVerificationToken, image, imageId, ...updateData } =
    req.body;

  if (!Object.keys(updateData).length) {
    throw new BadRequestError('Keine Einträge zum Aktualiseren');
  }

  Object.entries(updateData).forEach(([key, value]) => {
    isEmpty(key, value);
  });

  const updatedStudent = await database.student.update({
    where: { id: studentId },
    data: updateData
  });

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(
        StatusCodes.OK,
        'Änderungen gespeichert',
        excludeStudentSensitiveProperties(updatedStudent)
      )
    );
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

  const student = await database.student.findFirst({
    where: { id: studentId }
  });

  const imageId = student?.imageId;

  if (imageId) {
    await cloudinary.uploader.destroy(imageId);
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(imageSource, {
    folder: 'iu-quiz-app',
    unique_filename: true,
    resource_type: 'auto',
    allowed_formats: ['png', 'jpg']
  });

  const updatedStudent = await database.student.update({
    where: { id: studentId },
    data: { image: secure_url, imageId: public_id }
  });

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(
        StatusCodes.OK,
        'Profilbild erfolgreich hochgeladen',
        excludeStudentSensitiveProperties(updatedStudent)
      )
    );
}

/**
 * @route api/v1/student/image
 * @method DELETE
 * @access protected
 */
async function deleteImage(req: Request, res: Response) {
  const studentId = req.auth?.id;

  const student = await database.student.findFirst({
    where: { id: studentId }
  });
  const imageId = student?.imageId;

  if (!imageId) {
    throw new BadRequestError('Kein Bild zum Löschen');
  }

  await cloudinary.uploader.destroy(imageId);

  const updatedStudent = await database.student.update({
    where: { id: studentId },
    data: { image: '', imageId: '' }
  });

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(
        StatusCodes.OK,
        'Profilbild erfolgreich gelöscht',
        excludeStudentSensitiveProperties(updatedStudent)
      )
    );
}

export { findOne, update, uploadImage, deleteImage };
