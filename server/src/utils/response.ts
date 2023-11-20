import jwt from 'jsonwebtoken';

function createErrorResponse(statusCode: number, message: string) {
  return { success: false, statusCode: statusCode, message: message };
}

function createApiResponse(statusCode: number, message?: string, data?: Object) {
  return { success: true, statusCode: statusCode, message, data };
}

function parseIuStudentDefaultName(email: string) {
  return email.slice(0, email.lastIndexOf('@'));
}

function generateJWT(payload: Object) {
  return `Bearer ${jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME
  })}`;
}

export { createErrorResponse, createApiResponse, parseIuStudentDefaultName, generateJWT };
