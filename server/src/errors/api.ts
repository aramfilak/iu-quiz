class ApiError extends Error {
  private success: boolean = false;
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { ApiError };
