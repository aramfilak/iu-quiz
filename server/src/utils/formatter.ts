function createErrorResponse(statusCode: number, message: string) {
  return { success: false, statusCode: statusCode, message: message };
}

function createApiResponse(statusCode: number, message?: string, data?: Object) {
  return { success: true, statusCode: statusCode, message, data };
}

function parseIuStudentDefaultNickName(email: string) {
  return email.slice(0, email.lastIndexOf('@'));
}

export { createErrorResponse, createApiResponse, parseIuStudentDefaultNickName };
