/**
 * Custom error class for API-related errors.
 */
class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { ApiError };
