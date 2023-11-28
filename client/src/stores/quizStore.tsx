import { create } from 'zustand';
import { axiosQuizApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore } from '.';
import { Quiz } from '../utils/types';

interface UseQuizStore {
  quizzes: Quiz[] | null;
  getAllQuizzes: () => Promise<IuQuizServerResponse<Quiz[]>>;
  deleteQuizById: (quizId: number) => Promise<IuQuizServerResponse<void>>;
  createQuiz: (
    title: string,
    courseOfStudy: string,
    courseId: string
  ) => Promise<IuQuizServerResponse<void>>;
}

const useQuizStore = create<UseQuizStore>((set) => ({
  quizzes: null,

  getAllQuizzes: () =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.get('/', {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ quizzes: response.data.data });
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
      set((state) => ({
        quizzes: state.quizzes ? [...state.quizzes, response.data.data] : [response.data.data]
      }));

      return response.data;
    }),
  deleteQuizById: (quizId: number) =>
    asyncHandler(async () => {
      const response = await axiosQuizApi.delete(`/${quizId}`, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      // Update local state after successful deletion
      set((state) => ({
        quizzes: state.quizzes?.filter((quiz) => quiz.id !== quizId) || null
      }));

      return response.data;
    })
}));

export { useQuizStore };
