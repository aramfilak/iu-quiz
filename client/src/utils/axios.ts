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

export { axiosAuthApi };
