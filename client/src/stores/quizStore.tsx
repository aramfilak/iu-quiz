import { create } from 'zustand';
import { axiosQuizApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore, useStudentStore } from '.';
import { Quiz } from '../utils/types';

interface UseQuizStore {
  isLoading: boolean;
  followQuiz: (quizId: number) => Promise<IuQuizServerResponse<void>>;
  unfollowQuiz: (quizId: number) => Promise<IuQuizServerResponse<void>>;
  getFollowedQuizzes: () => Promise<Quiz[]>;
  getAllQuizzes: (params: Partial<Quiz>) => Promise<IuQuizServerResponse<Quiz[]>>;
  getStudentQuizzes: () => Promise<Quiz[]>;
  deleteQuizById: (quizId: number) => Promise<IuQuizServerResponse<void>>;
  createQuiz: (
    title: string,
    courseOfStudy: string,
    courseId: string
  ) => Promise<IuQuizServerResponse<void>>;
}

const useQuizStore = create<UseQuizStore>((set, get) => ({
  studentQuizzes: null,
  isLoading: true,

  getFollowedQuizzes: () =>
    asyncHandler(async () => {
      set({ isLoading: true });

      const response = await axiosQuizApi.get(`/follow`, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      set({ isLoading: false });

      return response.data.data;
    }),

  followQuiz: (quizId: number) =>
    asyncHandler(async () => {
      set({ isLoading: true });

      const response = await axiosQuizApi.post(`/follow/${quizId}`, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      return response.data;
    }),

  unfollowQuiz: (quizId: number) =>
    asyncHandler(async () => {
      set({ isLoading: true });

      const response = await axiosQuizApi.delete(`/follow/${quizId}`, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      return response.data;
    }),

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
