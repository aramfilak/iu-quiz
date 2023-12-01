import { create } from 'zustand';
import { axiosQuizApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore, useStudentStore } from '.';
import { Quiz } from '../utils/types';

interface UseQuizStore {
  isLoading: boolean;
  getAllQuizzes: (params: Partial<Quiz>) => Promise<IuQuizServerResponse<Quiz[]>>;
  getStudentQuizzes: () => Promise<Quiz[] | []>;
  deleteQuizById: (quizId: number) => Promise<IuQuizServerResponse<void>>;
  createQuiz: (
    title: string,
    courseOfStudy: string,
    courseId: string
  ) => Promise<IuQuizServerResponse<void>>;
}

const useQuizStore = create<UseQuizStore>((set, get) => ({
  studentQuizzes: null,
  isLoading: false,

  getStudentQuizzes: async () => {
    const { data } = await get().getAllQuizzes({
      authorId: useStudentStore.getState().studentProfile?.studentId
    });

    return data || [];
  },

  getAllQuizzes: (params: Partial<Quiz>) =>
    asyncHandler(async () => {
      set({ isLoading: true });

      const response = await axiosQuizApi.get(`/`, {
        params,
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      set({ isLoading: false });

      return response.data;
    }),
  createQuiz: (title: string, courseOfStudy: string, course: string) =>
    asyncHandler(async () => {
      set({ isLoading: true });

      const response = await axiosQuizApi.post(
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

      return response.data;
    }),
  deleteQuizById: (quizId: number) =>
    asyncHandler(async () => {
      set({ isLoading: true });

      const response = await axiosQuizApi.delete(`/${quizId}`, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      return response.data;
    })
}));

export { useQuizStore };
