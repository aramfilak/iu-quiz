import jwt from 'jsonwebtoken';
import { Response } from 'express';

function generateJWT(payload: Object) {
  return `Bearer ${jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME
  })}`;
}

function attachCookie(res: Response, cookieName: string, cookieValue: unknown) {
  let isSecure = true;

  if (process.env.NODE_ENV === 'development') {
    isSecure = false;
  }
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'none'
  });
}

function excludeObjectProperty(propertyName: string, obj: { [key: string]: any }) {
  const cleanedObject: { [key: string]: any } = {};

  for (const prop in obj) {
    if (prop !== propertyName) {
      cleanedObject[prop] = obj[prop];
    }
  }

  return cleanedObject;
}

export { excludeObjectProperty, attachCookie, generateJWT };
