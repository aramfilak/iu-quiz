export interface IuQuizServerResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
}

export interface CustomAlert {
  status: 'info' | 'warning' | 'success' | 'error' | 'loading';
  message: string;
}
