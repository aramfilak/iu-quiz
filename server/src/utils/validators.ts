import { BadRequestError } from '../errors';

function isEmpty<T>(valueName: string, value: T): T {
  if (value === undefined || value === null) {
    throw new BadRequestError(`${valueName} fehlt. Bitte eingeben, um fortzufahren.`);
  }

  if (typeof value === 'string') {
    value = value.trim() as T;
    if (!value) {
      throw new BadRequestError(`${valueName} darf nicht leer sein.`);
    }
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new BadRequestError(`${valueName} darf nicht leer sein.`);
    }
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
