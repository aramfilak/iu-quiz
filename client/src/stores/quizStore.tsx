import { create } from 'zustand';
import { axiosQuizApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore } from '.';
import { Quiz, QuizQuestion } from '../utils/types';

interface UseQuizStore {
  quiz: Quiz | QuizQuestion | null;
  getAllQuizzes: () => Promise<IuQuizServerResponse<Quiz>>;
  createQuiz: (data: Partial<Quiz>) => Promise<IuQuizServerResponse<Quiz>>;
  createQuizQuestion: (data: Partial<QuizQuestion>) => Promise<IuQuizServerResponse<QuizQuestion>>;
}

const useQuizStore = create<UseQuizStore>((set) => ({
  quiz: null,

  getAllQuizzes: () =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.get('/', {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ quiz: response.data.data });
      return response.data;
    }),
  createQuiz: (data: Partial<Quiz>) =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.post('/', data, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ quiz: response.data.data });
      return response.data;
    }),
  createQuizQuestion: (data: Partial<QuizQuestion>) =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.post('/question', data, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ quiz: response.data.data });
      return response.data;
    })
}));

export { useQuizStore };
