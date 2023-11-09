import { Request, Response } from 'express';
import { BadRequestError, UnauthorizedError } from '../../errors';
import bcrypt from 'bcryptjs';
import { database } from '../../configs';

import { StatusCodes } from 'http-status-codes';
import {
  ACCESS_TOKEN,
  createApiResponse,
  generateJWT,
  parseIuStudentDefaultNickName,
  attachCookie,
  isIuEmail,
  isValidPassword,
  isEmpty
} from '../../utils';

/**
 * Handles student sign-up.
 * @access public
 */
async function signUp(req: Request, res: Response) {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();
  isIuEmail(email);
  isValidPassword(password);

  const emailIsRegistered = await database.student.findFirst({ where: { email: email } });

  if (emailIsRegistered) {
    throw new BadRequestError('E-Mail ist bereits registriert');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const nickName = parseIuStudentDefaultNickName(email);

  const student = await database.student.create({
    data: { email: email, password: hashedPassword, nickName: nickName }
  });

  const accessToken = generateJWT({ id: student.id });

  attachCookie(res, ACCESS_TOKEN, accessToken);

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(
        StatusCodes.OK,
        `Willkommen ${nickName}, wir freuen uns, dass du dabei bist`
      )
    );
}

/**
 * Handles student sign-in.
 * @access public
 */

async function signIn(req: Request, res: Response) {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();
  isEmpty('email', email);
  isEmpty('password', password);

  const student = await database.student.findFirst({ where: { email: email } });
  if (!student) {
    throw new UnauthorizedError('E-Mail ist nicht registriert');
  }

  const passwordMatch = await bcrypt.compare(password, student.password);

  if (!passwordMatch) {
    throw new UnauthorizedError('Falsches Passwort');
  }

  const accessToken = generateJWT({ id: student.id });

  attachCookie(res, ACCESS_TOKEN, accessToken);

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, `Hey ${student.nickName} willkommen zurück`));
}

/**
 * Handles student sign-out.
 * @access public
 */

async function signOut(req: Request, res: Response) {
  res
    .status(StatusCodes.OK)
    .clearCookie(ACCESS_TOKEN)
    .json(createApiResponse(StatusCodes.OK, 'Bis zum nächsten Mal'));
}

export { signUp, signIn, signOut };
