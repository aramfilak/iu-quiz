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
  const { nickName } = req.body;
  const updateData = { nickName };

  if (!Object.keys(updateData).length) {
    throw new BadRequestError('Es sind keine Einträge vorhanden, die aktualisiert werden können');
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
    .json(createApiResponse(StatusCodes.OK, '', excludeStudentSensitiveProperties(updatedStudent)));
}

/**
 * @route api/v1/student/upload-profile-image
 * @method POST
 * @access protected
 */
async function uploadImage(req: Request, res: Response) {
  const studentId = req.auth?.id;
  const imageSource = req.file?.path;

  if (!imageSource) {
    throw new BadRequestError('Kein Bild zum Hochladen');
  }

  const { secure_url } = await cloudinary.uploader.upload(imageSource, {
    folder: 'iu-quiz-app',
    unique_filename: true,
    resource_type: 'auto',
    allowed_formats: ['png', 'jpg']
  });

  const updatedStudent = await database.student.update({
    where: { id: studentId },
    data: { image: secure_url }
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

export { findOne, update, uploadImage };
