import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils';
import { excludeObjectProperty } from '../../utils';

/**
 * Get Student data.
 * @access protected
 */

async function findOne(req: Request, res: Response) {
  const studentId = req.auth?.id;

  if (!studentId) {
    throw new UnauthorizedError('Sie sind nicht autorisiert');
  }

  const studentData = await database.student.findFirst({ where: { id: studentId } });

  if (!studentData) {
    throw new NotFoundError('Sie sind nicht registriert');
  }
  const studentDataWithOutPassword = excludeObjectProperty('password', studentData);

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, '', studentDataWithOutPassword));
}

async function update(req: Request, res: Response) {}

export { findOne, update };
