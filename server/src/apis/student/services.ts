import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/formatters';
import { excludeObjectProperty } from '../../utils/helpers';

/**
 * Get Student data.
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

  const studentDataWithOutPassword = excludeObjectProperty('password', studentData);

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, '', studentDataWithOutPassword));
}

/**
 * Update Student data.
 * @access protected
 */
async function update(req: Request, res: Response) {
  const studentId = req.auth?.id;
  const { fieldToUpdate, newValue } = req.body;

  if (!fieldToUpdate || !newValue) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      createApiResponse(StatusCodes.BAD_REQUEST, 'Die Angabe eines Felds und eines neuen Werts ist erforderlich!')
    );
  }

  const validFields = ['nickName', 'isVerified'];
  if (!validFields.includes(fieldToUpdate)) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      createApiResponse(StatusCodes.BAD_REQUEST, 'Ungültiges Feld zum Aktualisieren!')
    );
  }

  const updateData: Record<string, any> = {};
  updateData[fieldToUpdate] = newValue;

  const updatedStudent = await database.student.update({
    where: { id: studentId },
    data: updateData,
  });

  const updatedStudentWithoutPassword = excludeObjectProperty('password', updatedStudent);

  res.status(StatusCodes.OK).json(
    createApiResponse(StatusCodes.OK, `Die Aktualisierung von '${fieldToUpdate}' wurde erfolgreich durchgeführt!`, updatedStudentWithoutPassword)
  );
}

export { findOne, update };
