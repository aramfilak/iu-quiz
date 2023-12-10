import { create } from 'zustand';
import { axiosAuthApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore } from './index';

interface AuthResponse {
  success: boolean;
  statusCode: number;
  accessToken: string;
}

interface UseAuthStore {
  singUp: (
    email: string,
    password: string
  ) => Promise<IuQuizServerResponse<AuthResponse>>;
  signIn: (
    email: string,
    password: string
  ) => Promise<IuQuizServerResponse<AuthResponse>>;
  signOut: () => void;
  authenticate: (
    endpoint: string,
    email: string,
    password: string
  ) => Promise<IuQuizServerResponse<AuthResponse>>;
  verifyEmail: (
    email: string,
    emailVerificationToken: string
  ) => Promise<IuQuizServerResponse<unknown>>;
}

const useAuthStore = create<UseAuthStore>((_, get) => ({
  singUp: async (email: string, password: string) => {
    return await get().authenticate('/sign-up', email, password);
  },

  signIn: async (email: string, password: string) => {
    return await get().authenticate('/sign-in', email, password);
  },

  signOut: () => {
    usePersistStore.getState().setAccessToken(null);
    usePersistStore.getState().setIsAuthenticated(false);
    usePersistStore.getState().setActiveNaveLinkIndex(0);
  },

  authenticate: (endpoint: string, email: string, password: string) =>
    asyncHandler(async () => {
      const response = await axiosAuthApi.post<IuQuizServerResponse<AuthResponse>>(
        endpoint,
        {
          email: email,
          password: password
        }
      );

      const accessToken = response.data.data?.accessToken || null;

      usePersistStore.getState().setAccessToken(accessToken);
      usePersistStore.getState().setIsAuthenticated(Boolean(accessToken));

      return response.data;
    }),

  verifyEmail: (email: string, emailVerificationToken: string) =>
    asyncHandler(async () => {
      const response = await axiosAuthApi.post<IuQuizServerResponse<unknown>>(
        '/verify-email',
        {
          email: email,
          emailVerificationToken: emailVerificationToken
        }
      );

      return response.data;
    })
}));

export { useAuthStore };
