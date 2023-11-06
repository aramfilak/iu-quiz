import jwt from 'jsonwebtoken';
import { Response } from 'express';

function createErrorResponse(statusCode: number, message: string) {
  return { success: false, statusCode: statusCode, message: message };
}

function createApiResponse(
  statusCode: number,
  message?: string,
  accessToken?: string,
  data?: Object
) {
  return { success: true, statusCode: statusCode, message, accessToken, data };
}

function generateJWT(payload: Object) {
  return `Bearer ${jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '14d' })}`;
}

function parseIuStudentName(email: string) {
  return `@${email.slice(0, email.lastIndexOf('@'))}`;
}

function attachCookie(res: Response, cookieName: string, cookieValue: unknown) {
  let isSecure = true;

  if (process.env.NODE_ENV === 'development') {
    isSecure = false;
  }

  res.cookie(cookieName, cookieValue, { httpOnly: true, secure: isSecure });
}

export { createErrorResponse, createApiResponse, generateJWT, parseIuStudentName, attachCookie };
