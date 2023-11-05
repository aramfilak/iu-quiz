import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import bcrypt from 'bcryptjs';
import { database } from '../config';

async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('E-Mail oder Passwort werden nicht angegeben');
  }

  const emailIsRegistered = await database.user.findFirst(email);

  if (emailIsRegistered) {
    throw new BadRequestError('E-Mail ist bereits registriert');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // const user = await database.user.create({ data: { email: email, password: hashedPassword } });
}

async function signIn() {}

export { signUp, signIn };
