import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Actions {
  activeNaveLinkIndex: number;
  questionFormsPanelIndex: number;
  accessToken: string | null;
  isAuthenticated: boolean;
  signInStudentId: string | null;
  setSignInStudentId: (studentId: string | null) => void;
  setActiveNaveLinkIndex: (index: number) => void;
  setQuestionFormsPanelIndex: (index: number) => void;
  setAccessToken: (toke: string | null) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
  reset: () => void;
}
interface States {
  activeNaveLinkIndex: number;
  questionFormsPanelIndex: number;
  accessToken: string | null;
  isAuthenticated: boolean;
  signInStudentId: string | null;
}

const initialStates: States = {
  accessToken: null,
  signInStudentId: null,
  isAuthenticated: false,
  activeNaveLinkIndex: 0,
  questionFormsPanelIndex: 0
};

const usePersistStore = create(
  persist<States & Actions>(
    (set) => ({
      ...initialStates,

      setSignInStudentId: (studentId: string | null) =>
        set({ signInStudentId: studentId }),

      setQuestionFormsPanelIndex: (index: number) =>
        set({ questionFormsPanelIndex: index }),

      setActiveNaveLinkIndex: (index: number) => set({ activeNaveLinkIndex: index }),

      setAccessToken: (token: string | null) => set({ accessToken: token }),

      setIsAuthenticated: (isAuth: boolean) => set({ isAuthenticated: isAuth }),

      reset: () => set(initialStates)
    }),

    {
      name: 'persist-storage'
    }
  )
);

export { usePersistStore };
