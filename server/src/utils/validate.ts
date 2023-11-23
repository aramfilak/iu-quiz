import { BadRequestError } from '../errors';

class Validate {
  constructor() {}

  public isEmpty<T>(valueName: string, value: T): T {
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

  public isValidPassword(password: string) {
    password = this.isEmpty('Password', password);

    //Minimum eight characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#€$%^&*()-_+=]{8,}$/gm;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
      throw new BadRequestError('Passwort nicht stark genug');
    }

    return password;
  }

  public isIuEmail(email: string) {
    email = this.isEmpty('Email', email);

    //  Email and end with : @iubh-fernstudium.de or with @iu-study.org
    const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const iuEmailRegex = /@[iI][uU][bB][hH]-fernstudium\.de$|@iu-study\.org$/i;
    const isValidIuEmail = iuEmailRegex.test(email) && EmailRegex.test(email);

    if (!isValidIuEmail) {
      throw new BadRequestError('Ungültige IU E-Mail');
    }

    return email;
  }

  public min(valueName: string, value: string, minLength: number, isEmpty = true): string {
    if (isEmpty) {
      value = this.isEmpty(valueName, value);
    }

    if (value.length < minLength) {
      throw new BadRequestError(`${valueName} muss mindestens ${minLength} Zeichen lang sein.`);
    }

    return value;
  }

  public max(valueName: string, value: string, maxLength: number, isEmpty = true): string {
    if (isEmpty) {
      value = this.isEmpty(valueName, value);
    }

    if (value.length > maxLength) {
      throw new BadRequestError(`${valueName} darf maximal ${maxLength} Zeichen lang sein.`);
    }

    return value;
  }

  public url(urlType: 'linkedin' | 'xing', url: string) {
    if (!url) return url;

    if (urlType === 'linkedin') {
      const validLinkInUrl = url.startsWith('https://www.linkedin.com/');
      if (!validLinkInUrl) {
        throw new BadRequestError('Ungültige LinkedIn URL');
      } else {
        return url;
      }
    }

    if (urlType === 'xing') {
      const validXingUrl = url.startsWith('https://www.xing.com');
      if (!validXingUrl) {
        throw new BadRequestError('Ungültige Xing URL');
      } else {
        return url;
      }
    }
  }
}

const validate = new Validate();

export { validate };
