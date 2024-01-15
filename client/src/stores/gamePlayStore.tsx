import { create } from 'zustand';

interface UseGamePlayStore {
  currentQuestionIndex: number;
  duration: number;
  intervalId: null | number;
  handleNavigation: (direction: 'previous' | 'next', quizSize: number) => void;
  startTimeout: () => void;
  stopTimeout: () => void;
  resetStore: () => void;
}

const initialState = {
  currentQuestionIndex: 0,
  duration: 0,
  intervalId: null
};

const useGamePlayStore = create<UseGamePlayStore>((set, get) => ({
  ...initialState,

  handleNavigation: (direction: 'previous' | 'next', quizSize) => {
    set((state) => {
      if (direction === 'previous' && state.currentQuestionIndex > 0) {
        return { currentQuestionIndex: state.currentQuestionIndex - 1 };
      } else if (direction === 'next' && state.currentQuestionIndex < quizSize - 1) {
        return { currentQuestionIndex: state.currentQuestionIndex + 1 };
      } else return {};
    });
  },

  startTimeout: () => {
    get().stopTimeout();

    const intervalId = window.setInterval(() => {
      set((state) => ({ duration: state.duration + 1 }));
    }, 1000);

    set({ intervalId: intervalId });
  },

  stopTimeout: () => {
    if (get().intervalId) {
      window.clearInterval(get().intervalId!);
    }
  },

  resetStore: () => {
    get().stopTimeout();
    set(initialState);
  }
}));

export { useGamePlayStore };
