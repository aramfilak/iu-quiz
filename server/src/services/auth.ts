import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import bcrypt from 'bcryptjs';
import { database } from '../config';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse, generateJWT, isValidIUEmail } from '../utils';

async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    throw new BadRequestError('E-Mail oder Passwort werden nicht angegeben');
  }

  if (!isValidIUEmail(email)) {
    throw new BadRequestError('Ungültige IU-E-Mail');
  }

  const emailIsRegistered = await database.user.findFirst({ where: { email: email } });

  if (emailIsRegistered) {
    throw new BadRequestError('E-Mail ist bereits registriert');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await database.user.create({ data: { email: email, password: hashedPassword } });

  const jwt = generateJWT({ id: user.id });

  res.status(StatusCodes.OK).cookie('auth-jwt', jwt).json(createApiResponse(StatusCodes.OK));
}

async function signIn() {}

export { signUp, signIn };
