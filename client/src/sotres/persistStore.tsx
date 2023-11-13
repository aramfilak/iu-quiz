import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersistStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}
const usePersistStore = create(
  persist<PersistStore>(
    (set) => ({
      isAuthenticated: false,

      setIsAuthenticated: (val: boolean) => set({ isAuthenticated: val })
    }),
    {
      name: 'persist-storage'
    }
  )
);

export { usePersistStore };
