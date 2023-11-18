import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../errors';
import bcrypt from 'bcryptjs';
import { database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse, parseIuStudentDefaultNickName } from '../../utils/formatters';
import { isIuEmail, isValidPassword, isEmpty } from '../../utils/validators';
import { generateJWT } from '../../utils/helpers';
import { sendVerificationEmail } from '../../utils/emails';
import crypto from 'crypto';

/**
 * ________________________________________________________________
 * @route api/v1/auth/sign-up
 * @method POST
 * @access public
 * ________________________________________________________________
 */
async function signUp(req: Request, res: Response) {
  let { email, password } = req.body;

  email = isIuEmail(email);
  password = isValidPassword(password);

  const student = await database.studentAuth.findFirst({ where: { email: email } });

  if (student && !student.isVerified) {
    throw new BadRequestError(
      `Bitte verifizieren Sie Ihre E-Mail-Adresse.\n 
       Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.`
    );
  }

  if (student) {
    throw new BadRequestError('E-Mail ist bereits registriert');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const nickName = parseIuStudentDefaultNickName(email);

  const verificationToken = crypto.randomBytes(30).toString('hex');

  await database.studentAuth.create({
    data: {
      email: email,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      studentProfile: {
        create: {
          nickName: nickName,
          profileImage: {
            create: {
              publicId: '',
              url: ''
            }
          }
        }
      }
    }
  });

  await sendVerificationEmail({
    name: nickName,
    email: email,
    verificationToken: verificationToken
  });

  res
    .status(StatusCodes.OK)
    .json(
      createApiResponse(
        StatusCodes.OK,
        'Bitte bestätigen Sie Ihre E-Mail-Adresse, um sich anzumelden'
      )
    );
}

/**
 * ________________________________________________________________
 * @route api/v1/auth/verify-email
 * @method POST
 * @access public
 * ________________________________________________________________
 */
async function verifyEmail(req: Request, res: Response) {
  const { email, emailVerificationToken } = req.body;

  const student = await database.studentAuth.findFirst({
    where: { email: email }
  });

  if (!student) {
    throw new NotFoundError('Email ist nicht registriert');
  }
  if (student.isVerified) {
    return res
      .status(StatusCodes.OK)
      .json(
        createApiResponse(
          StatusCodes.OK,
          'Ihre E-Mail-Adresse ist bereits bestätigt. bitte anmelden'
        )
      );
  }

  if (student.emailVerificationToken !== emailVerificationToken) {
    throw new UnauthorizedError('Verifizierung fehlgeschlagen');
  }

  await database.studentAuth.update({
    where: { email: email, emailVerificationToken: emailVerificationToken },
    data: {
      isVerified: true,
      emailVerificationToken: ''
    }
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Verifizierung ist abgeschlossen'));
}

/**
 * ________________________________________________________________
 * @route api/v1/auth/sign-in
 * @method POST
 * @access public
 * ________________________________________________________________
 */
async function signIn(req: Request, res: Response) {
  let { email, password } = req.body;

  email = isEmpty('email', email);
  password = isEmpty('password', password);

  const student = await database.studentAuth.findFirst({ where: { email: email } });

  if (student && !student.isVerified) {
    throw new BadRequestError('Bitte bestätigen Sie Ihre E-Mail, um sich einzuloggen');
  }

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

export { signIn, signUp, verifyEmail };
