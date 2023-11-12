import { BadRequestError } from '../errors';

function isEmpty(valueName: string, value: string) {
  value = value.trim();

  const isEmpty = value === undefined || value === null || !value.length;

  if (isEmpty) {
    throw new BadRequestError(`${valueName} ist ein Pflichtfeld`);
  }

  return value;
}

function isValidPassword(password: string) {
  password = isEmpty('Password', password);

  //Minimum eight characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#€$%^&*()-_+=]{8,}$/gm;
  const isValidPassword = passwordRegex.test(password);

  if (!isValidPassword) {
    throw new BadRequestError('Passwort nicht stark genug');
  }

  return password;
}

function isIuEmail(email: string) {
  email = isEmpty('email', email);

  //  Email and end with : @iubh-fernstudium.de or with @iu-study.org
  const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const iuEmailRegex = /@[iI][uU][bB][hH]-fernstudium\.de$|@iu-study\.org$/i;
  const isValidIuEmail = iuEmailRegex.test(email) && EmailRegex.test(email);

  if (!isValidIuEmail) {
    throw new BadRequestError('Ungültige IU E-Mail');
  }

  return email;
}

export { isIuEmail, isValidPassword, isEmpty };
