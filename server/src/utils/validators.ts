import { BadRequestError } from '../errors';

function isEmpty(key: string, value: string) {
  const isEmpty = value === undefined || value === null || !value.trim().length;

  if (isEmpty) {
    throw new BadRequestError(`${key} ist ein Pflichtfeld`);
  }
}

function isValidPassword(password: string) {
  isEmpty('Password', password);

  //Minimum eight characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#€$%^&*()-_+=]{8,}$/gm;
  const isValidPassword = passwordRegex.test(password);

  if (!isValidPassword) {
    throw new BadRequestError('Passwort nicht stark genug');
  }
}

function isIuEmail(email: string) {
  isEmpty('email', email);

  //  Email and end with : @iubh-fernstudium.de or with @iu-study.org
  const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const iuEmailRegex = /@[iI][uU][bB][hH]-fernstudium\.de$|@iu-study\.org$/i;
  const isValidIuEmail = iuEmailRegex.test(email) && EmailRegex.test(email);

  if (!isValidIuEmail) {
    throw new BadRequestError('Ungültige IU E-Mail');
  }
}

export { isIuEmail, isValidPassword, isEmpty };
