import { create } from 'zustand';
import { axiosQuizApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore } from '.';
import { Quiz } from '../utils/types';

interface UseQuizStore {
  studentQuizzes: Quiz[] | null;
  getAllQuizzes: (params: Partial<Quiz>) => Promise<IuQuizServerResponse<Quiz[]>>;
  deleteQuizById: (quizId: number) => Promise<IuQuizServerResponse<void>>;
  createQuiz: (
    title: string,
    courseOfStudy: string,
    courseId: string
  ) => Promise<IuQuizServerResponse<void>>;
}

const useQuizStore = create<UseQuizStore>((set) => ({
  studentQuizzes: null,

  getAllQuizzes: (params: Partial<Quiz>) =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.get(`/`, {
        params,
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      set({ studentQuizzes: response.data.data });

      return response.data;
    }),
  createQuiz: (title: string, courseOfStudy: string, courseId: string) =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.post(
        '/',
        {
          title,
          courseOfStudy,
          courseId
        },
        {
          headers: { Authorization: usePersistStore.getState().accessToken }
        }
      );

      set({ studentQuizzes: response.data.data });

      return response.data;
    }),
  deleteQuizById: (quizId: number) =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.delete(`/${quizId}`, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      set({ studentQuizzes: response.data.data });

      return response.data;
    })
}));

export { useQuizStore };
