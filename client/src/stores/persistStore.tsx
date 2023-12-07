import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersistStore {
  activeNaveLinkIndex: number;
  questionFormsPanelIndex: number;
  accessToken: string | null;
  isAuthenticated: boolean;
  setActiveNaveLinkIndex: (index: number) => void;
  setQuestionFormsPanelIndex: (index: number) => void;
  setAccessToken: (toke: string | null) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
}
const usePersistStore = create(
  persist<PersistStore>(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      activeNaveLinkIndex: 0,
      questionFormsPanelIndex: 0,

      setQuestionFormsPanelIndex: (index: number) =>
        set({ questionFormsPanelIndex: index }),

      setActiveNaveLinkIndex: (index: number) => set({ activeNaveLinkIndex: index }),

      setAccessToken: (token: string | null) => set({ accessToken: token }),

      setIsAuthenticated: (isAuth: boolean) => set({ isAuthenticated: isAuth })
    }),
    {
      name: 'persist-storage'
    }
  )
);

export { usePersistStore };
