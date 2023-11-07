import { create } from 'zustand';
import { axiosAuthApi } from '../utils/';
import axios from 'axios';

interface AuthResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

interface useAuthStore {
  isShowSingInForm: boolean;
  showSignInForm: () => void;
  showSignUpForm: () => void;
  singUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  authenticate: (endpoint: string, email: string, password: string) => Promise<AuthResponse>;
}

const useAuthStore = create<useAuthStore>((set, get) => ({
  isShowSingInForm: true,

  showSignInForm: () => set({ isShowSingInForm: true }),

  showSignUpForm: () => set({ isShowSingInForm: false }),

  singUp: async (email: string, password: string) => {
    return await get().authenticate('/sign-up', email, password);
  },

  signIn: async (email: string, password: string) => {
    return await get().authenticate('/sign-in', email, password);
  },

  authenticate: async (
    endpoint: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const response = await axiosAuthApi.post<AuthResponse>(endpoint, {
        email: email,
        password: password
      });

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response && e.response.data) {
        return e.response.data;
      } else {
        return {
          success: false,
          message: 'Server Error 🚧',
          statusCode: 500
        };
      }
    }
  }
}));

export { useAuthStore };
