import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../errors';
import bcrypt from 'bcryptjs';
import { db } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse, parseIuStudentDefaultName } from '../../utils/response';
import { validate } from '../../utils/validate';
import { generateJWT } from '../../utils/response';
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

  email = validate.isIuEmail(email);
  password = validate.isValidPassword(password);

  const student = await db.student.findFirst({ where: { email: email } });

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

  const name = parseIuStudentDefaultName(email);

  const verificationToken = crypto.randomBytes(30).toString('hex');

  await db.student.create({
    data: {
      email: email,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      studentProfile: {
        create: {
          name: name
        }
      }
    }
  });

  await sendVerificationEmail({
    name: name,
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

  const student = await db.student.findFirst({
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

  await db.student.update({
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

  email = validate.isEmpty('Email', email);
  password = validate.isEmpty('Password', password);

  const student = await db.student.findFirst({ where: { email: email } });

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
    createApiResponse(StatusCodes.OK, 'Willkommen zurück', {
      accessToken: accessToken,
      studentId: student.id
    })
  );
}

export { signIn, signUp, verifyEmail };
