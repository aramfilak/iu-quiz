import { create } from 'zustand';
import { axiosAuthApi } from '../utils/axios';
import { AxiosResponse } from 'axios';

interface RequestStatus {
  success: boolean;
  message: string;
  statusCode: number;
  data: unknown;
}

interface AuthResponse extends AxiosResponse {
  data: RequestStatus;
}

interface useAuthStore {
  showSignForm: boolean;
  toggleAuthForm: () => void;
  singUp: (email: string, password: string) => Promise<RequestStatus>;
  signIn: (email: string, password: string) => Promise<RequestStatus>;
  authenticate: (endpoint: string, email: string, password: string) => Promise<RequestStatus>;
}

const useAuthStore = create<useAuthStore>((set, get) => ({
  showSignForm: true,

  toggleAuthForm: () => set((state) => ({ showSignForm: !state.showSignForm })),

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
  ): Promise<RequestStatus> => {
    try {
      const response: AuthResponse = await axiosAuthApi.post(endpoint, {
        email: email,
        password: password
      });

      console.log(response, document.cookie.split(';')[0]);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}));

export { useAuthStore };
