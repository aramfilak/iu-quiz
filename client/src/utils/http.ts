import axios from 'axios';

const isDevelopmentMode = import.meta.env.DEV;

let baseURL = 'https://iu-quiz-seven.vercel.app';

if (isDevelopmentMode) {
  baseURL = 'http://localhost:4000';
}

const axiosAuthApi = axios.create({
  baseURL: `${baseURL}/api/v1/auth`,
  withCredentials: true
});

const axiosStudentApi = axios.create({
  baseURL: `${baseURL}/api/v1/student`,
  withCredentials: true
});

/**
 * Handle asynchronous errors
 */
const serverErrorMessage = {
  success: false,
  message: 'Server Error',
  statusCode: 500
};

async function asyncHandler<T>(asyncFunction: () => Promise<T>): Promise<T> {
  try {
    return await asyncFunction();
  } catch (e) {
    return axios.isAxiosError(e) ? e.response?.data : serverErrorMessage;
  }
}

export { axiosAuthApi, axiosStudentApi, asyncHandler, serverErrorMessage };
