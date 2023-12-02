import { create } from 'zustand';
import { axiosQuizApi, asyncHandler } from '../utils/http';
import { QuizQueryParams } from '../utils/types';
import { usePersistStore } from '.';
import { Quiz } from '../utils/types';

interface UseQuizStore {
  isLoading: boolean;
  getAllQuizzes: (params: Partial<QuizQueryParams>) => Promise<Quiz[]>;
  deleteQuizById: (quizId: number) => Promise<void>;
  createQuiz: (title: string, courseOfStudy: string, courseId: string) => Promise<void>;
  followQuiz: (quizId: number) => Promise<void>;
  unfollowQuiz: (quizId: number) => Promise<void>;
}

const useQuizStore = create<UseQuizStore>((set) => ({
  studentQuizzes: null,
  isLoading: false,

  getAllQuizzes: (params: Partial<QuizQueryParams>) =>
    asyncHandler(async () => {
      set({ isLoading: true });

      const response = await axiosQuizApi.get(`/`, {
        params,
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      set({ isLoading: false });
      return response.data.data;
    }),

  createQuiz: async (title: string, courseOfStudy: string, course: string) => {
    set({ isLoading: true });

    await axiosQuizApi.post(
      '/',
      {
        title,
        courseOfStudy,
        course
      },
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );
  },

  deleteQuizById: async (quizId: number) => {
    set({ isLoading: true });

    await axiosQuizApi.delete(`/${quizId}`, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });
  },

  followQuiz: async (quizId: number) => {
    set({ isLoading: true });

    await axiosQuizApi.post(
      `/follow/${quizId}`,
      {},
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );
  },

  unfollowQuiz: async (quizId: number) => {
    set({ isLoading: true });

    await axiosQuizApi.delete(`/follow/${quizId}`, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });
  }
}));

export { useQuizStore };
