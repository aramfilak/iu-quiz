import jwt from 'jsonwebtoken';

function createErrorResponse(statusCode: number, message: string) {
  return { success: false, statusCode: statusCode, message: message };
}

function createApiResponse(statusCode: number, message: string) {
  return { success: true, statusCode: statusCode, message: message };
}

function generateJWT(payload: Object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME
  });
}

export { createErrorResponse, createApiResponse, generateJWT };
