import { Request, Response } from 'express';
import { BadRequestError, UnauthorizedError } from '../../errors';
import bcrypt from 'bcryptjs';
import { database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse, generateJWT, parseIuStudentName, attachCookie } from '../../utils';

/**
 * Handles student sign-up.
 * @access public
 */

enum constants {
  access_token = 'access_token'
}

async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('E-Mail oder Passwort werden nicht angegeben 😅');
  }

  const emailIsRegistered = await database.student.findFirst({ where: { email: email } });

  if (emailIsRegistered) {
    throw new BadRequestError('E-Mail ist bereits registriert 🙂');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const student = await database.student.create({
    data: { email: email, password: hashedPassword, nickName: parseIuStudentName(email) }
  });

  const accessToken = generateJWT({ id: student.id });

  attachCookie(res, constants.access_token, accessToken);

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(
        StatusCodes.OK,
        `Willkommen ${parseIuStudentName(student.email)}, wir freuen uns, dass du dabei bist 🙌`
      )
    );
}

/**
 * Handles student sign-in.
 * @access public
 */

async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('E-Mail oder Passwort werden nicht angegeben 😅');
  }

  const student = await database.student.findFirst({ where: { email: email } });
  if (!student) {
    throw new UnauthorizedError('E-Mail ist nicht registriert 😗');
  }

  const passwordMatch = await bcrypt.compare(password, student.password);

  if (!passwordMatch) {
    throw new UnauthorizedError('Falsches Passwort 😬');
  }

  const accessToken = generateJWT({ id: student.id });

  attachCookie(res, constants.access_token, accessToken);

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, `Hey ${student.nickName} willkommen zurück 🫶`));
}

/**
 * Handles student sign-out.
 * @access public
 */

async function signOut(req: Request, res: Response) {
  res
    .status(StatusCodes.OK)
    .clearCookie(constants.access_token)
    .json(createApiResponse(StatusCodes.OK, 'Bis zum nächsten Mal 👋'));
}

export { signUp, signIn, signOut };
