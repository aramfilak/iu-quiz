import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/formatters';
import { excludeSensitiveProperties } from '../../utils/helpers';
import { Student } from '@prisma/client';
import { isEmpty} from '../../utils/validators';

const excludeStudentSensitiveProperties = (student: Student) =>
  excludeSensitiveProperties(['password', 'emailVerificationToken'], student);

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
  const { email, password, ...updateData } = req.body;
  const nonEmptyValues: Record<string, unknown> = {};

  Object.entries(updateData).forEach(([key, value]) => {
    if (typeof value === 'string') {
      nonEmptyValues[key] = isEmpty(key, value);
    }
    nonEmptyValues[key] = value;
  });

  const updatedStudent = await database.student.update({
    where: { id: studentId },
    data: nonEmptyValues,
  });

  res.status(StatusCodes.OK).json(
    createApiResponse(StatusCodes.OK, ``, excludeStudentSensitiveProperties(updatedStudent))
  );
}

export { findOne, update };
