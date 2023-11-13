import { Request, Response } from 'express';
import { BadRequestError, UnauthorizedError } from '../../errors';
import bcrypt from 'bcryptjs';
import { database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse, parseIuStudentDefaultNickName } from '../../utils/formatters';
import { isIuEmail, isValidPassword, isEmpty } from '../../utils/validators';
import { generateJWT } from '../../utils/helpers';

/**
 * Handles student sign-up.
 * @access public
 */
async function signUp(req: Request, res: Response) {
  let { email, password } = req.body;

  email = isIuEmail(email);
  password = isValidPassword(password);

  const emailIsRegistered = await database.student.findFirst({ where: { email: email } });

  if (emailIsRegistered) {
    throw new BadRequestError('E-Mail ist bereits registriert');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const nickName = parseIuStudentDefaultNickName(email);

  const student = await database.student.create({
    data: { email: email, password: hashedPassword, verified: false, nickName, quiz: [{}] }
  });

  const accessToken = generateJWT({ id: student.id });

  res.status(StatusCodes.OK).json(
    createApiResponse(
      StatusCodes.OK,
      `Willkommen ${nickName}, wir freuen uns, dass du dabei bist`,
      {
        accessToken: accessToken
      }
    )
  );
}

/**
 * Handles student sign-in.
 * @access public
 */

async function signIn(req: Request, res: Response) {
  let { email, password } = req.body;

  email = isEmpty('email', email);
  password = isEmpty('password', password);

  const student = await database.student.findFirst({ where: { email: email } });
  if (!student) {
    throw new BadRequestError('E-Mail ist nicht registriert');
  }

  const passwordMatch = await bcrypt.compare(password, student.password);

  if (!passwordMatch) {
    throw new BadRequestError('Falsches Passwort');
  }

  const accessToken = generateJWT({ id: student.id });

  res.status(StatusCodes.OK).json(
    createApiResponse(StatusCodes.OK, `Willkommen zurück`, {
      accessToken: accessToken
    })
  );
}

/**
 * Handles student sign-out.
 * @access public
 */

export { signUp, signIn };
