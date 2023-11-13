import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersistStore {
  accessToken: string | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  setAccessToken: (val: string | null) => void;
}
const usePersistStore = create(
  persist<PersistStore>(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,

      setAccessToken: (val: string | null) => set({ accessToken: val }),

      setIsAuthenticated: (val: boolean) => set({ isAuthenticated: val })
    }),
    {
      name: 'persist-storage'
    }
  )
);

export { usePersistStore };
