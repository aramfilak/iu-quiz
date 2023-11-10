import { create } from 'zustand';
import { axiosAuthApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';

interface UseAuthStore {
  isShowSingInForm: boolean;
  showSignInForm: () => void;
  showSignUpForm: () => void;
  singUp: (email: string, password: string) => Promise<IuQuizServerResponse<unknown>>;
  signIn: (email: string, password: string) => Promise<IuQuizServerResponse<unknown>>;
  signOut: () => Promise<IuQuizServerResponse<unknown>>;
  authenticate: (
    endpoint: string,
    email: string,
    password: string
  ) => Promise<IuQuizServerResponse<unknown>>;
}

const useAuthStore = create<UseAuthStore>((set, get) => ({
  isShowSingInForm: true,

  showSignInForm: () => set({ isShowSingInForm: true }),

  showSignUpForm: () => set({ isShowSingInForm: false }),

  singUp: async (email: string, password: string) => {
    return await get().authenticate('/sign-up', email, password);
  },

  signIn: async (email: string, password: string) => {
    return await get().authenticate('/sign-in', email, password);
  },

  signOut: () =>
    asyncHandler(async () => {
      const response = await axiosAuthApi.post<IuQuizServerResponse<unknown>>('/sign-out');
      localStorage.setItem('is_authenticated', 'false');
      return response.data;
    }),

  authenticate: (endpoint: string, email: string, password: string) =>
    asyncHandler(async () => {
      const response = await axiosAuthApi.post<IuQuizServerResponse<unknown>>(endpoint, {
        email: email,
        password: password
      });
      return response.data;
    })
}));

export { useAuthStore };
