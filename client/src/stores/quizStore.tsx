import { create } from 'zustand';
import { axiosQuizApi, asyncHandler } from '../utils/http';
import { QuizQueryParams } from '../utils/types';
import { usePersistStore } from '.';
import { Quiz } from '../utils/types';

interface UseQuizStore {
  getAllQuizzes: (params: Partial<QuizQueryParams>) => Promise<Quiz[]>;
  createQuiz: (title: string, courseOfStudy: string, courseId: string) => Promise<void>;
  updateQuiz: (
    quizId: number,
    title: string,
    courseOfStudy: string,
    course: string
  ) => Promise<void>;
  deleteQuizById: (quizId: number) => Promise<void>;
  followQuiz: (quizId: number) => Promise<void>;
  unfollowQuiz: (quizId: number) => Promise<void>;
}

const useQuizStore = create<UseQuizStore>(() => ({
  getAllQuizzes: (params: Partial<QuizQueryParams>) =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.get(`/`, {
        params,
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      return response.data.data;
    }),

  createQuiz: async (title: string, courseOfStudy: string, course: string) => {
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

  updateQuiz: async (
    quizId: number,
    title: string,
    courseOfStudy: string,
    course: string
  ) => {
    await axiosQuizApi.patch(
      `/${quizId}`,
      { title, courseOfStudy, course },
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );
  },

  deleteQuizById: async (quizId: number) => {
    await axiosQuizApi.delete(`/${quizId}`, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });
  },

  followQuiz: async (quizId: number) => {
    await axiosQuizApi.post(
      `/follow/${quizId}`,
      {},
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );
  },

  unfollowQuiz: async (quizId: number) => {
    await axiosQuizApi.delete(`/follow/${quizId}`, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });
  }
}));

export { useQuizStore };
