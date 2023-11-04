import { create } from 'zustand';

interface useAuthStore {
  showSignForm: boolean;
  toggleAuthForm: () => void;
}

const useAuthStore = create<useAuthStore>((set) => ({
  showSignForm: true,

  toggleAuthForm: () => set((state) => ({ showSignForm: !state.showSignForm }))
}));

export { useAuthStore };
