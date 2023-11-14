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
  const { newNickName } = req.body;

  if (!newNickName) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      createApiResponse(StatusCodes.BAD_REQUEST, 'Die Angabe eines Nicknames ist erforderlich!')
    );
  }

  const updatedStudent = await database.student.update({
    where: { id: studentId },
    data: { nickName: newNickName }
  });

  const updatedStudentWithoutPassword = excludeObjectProperty('password', updatedStudent);

  res.status(StatusCodes.OK).json(
    createApiResponse(StatusCodes.OK, 'Die Aktualisierung ihres Nicknames wurde erfolgreich durchgeführt!', updatedStudentWithoutPassword)
  );
}

export { findOne, update };
