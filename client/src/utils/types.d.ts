interface IuQuizServerResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
}

export { IuQuizServerResponse };
