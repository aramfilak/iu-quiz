import { create } from 'zustand';
import { QuizQuestion } from '../utils/types';
import { useQuizStore } from '.';
import { shuffleArray } from '../utils/helpers';

interface UseGamePlayStore {
  currentQuestion: QuizQuestion | null;
  currentQuestionIndex: number;
  correctAnswers: number;
  gameIsFinished: boolean;
  takenTime: number;
  intervalId: null | number;
  setCurrentQuestion: (question: QuizQuestion) => void;
  handleNavigation: (quizSize: number) => void;
  incrementNumberOfCorrectAnswers: () => void;
  startTimeout: () => void;
  stopTimeout: () => void;
  resetStore: () => void;
  setGameIsFinished: (val: boolean) => void;
}

const initialState = {
  currentQuestion: null,
  gameIsFinished: false,
  currentQuestionIndex: 0,
  correctAnswers: 0,
  takenTime: 0,
  intervalId: null
};

const useGamePlayStore = create<UseGamePlayStore>((set, get) => ({
  ...initialState,

  handleNavigation: (quizSize: number) => {
    set((state) => {
      if (state.currentQuestionIndex < quizSize - 1) {
        const newIndex = state.currentQuestionIndex + 1;
        const question = useQuizStore.getState().activeQuiz?.quizQuestions[newIndex];
        if (question) {
          get().setCurrentQuestion(question);
        }
        return {
          currentQuestionIndex: newIndex
        };
      }

      return {};
    });
  },

  setGameIsFinished: (val: boolean) => set({ gameIsFinished: val }),

  setCurrentQuestion: (question: QuizQuestion) => {
    question.quizAnswers = shuffleArray(question.quizAnswers);
    set({ currentQuestion: question });
  },

  incrementNumberOfCorrectAnswers: () =>
    set((state) => ({ correctAnswers: state.correctAnswers + 1 })),

  startTimeout: () => {
    get().stopTimeout();

    const intervalId = window.setInterval(() => {
      set((state) => ({ takenTime: state.takenTime + 1 }));
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
