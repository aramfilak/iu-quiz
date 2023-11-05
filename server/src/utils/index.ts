import jwt from 'jsonwebtoken';

function createErrorResponse(statusCode: number, message: string) {
  return { success: false, statusCode: statusCode, message: message };
}

function createApiResponse(statusCode: number, data?: any) {
  return { success: true, statusCode: statusCode, data };
}

function generateJWT(payload: Object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '14d'
  });
}

function isValidIUEmail(email: string) {
  return email.match(/@[iI][uU][bB][hH]-fernstudium\.de$|@iu-study\.org$/i);
}

export { createErrorResponse, createApiResponse, generateJWT, isValidIUEmail };
