import axios from 'axios';

const isDevelopmentMode = import.meta.env.DEV;

let baseURL = 'https://iu-quiz-seven.vercel.app';

if (isDevelopmentMode) {
  baseURL = 'http://localhost:4000';
}

const axiosUsersApi = axios.create({
  baseURL: `${baseURL}/users`
});

export { axiosUsersApi };
