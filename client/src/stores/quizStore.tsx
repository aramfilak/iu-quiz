import { create } from 'zustand';
import { usePersistStore } from '.';
import { ActionType } from '../utils/enums';
import { axiosQuizApi, axiosQuizQuestionApi } from '../utils/http';
import { QuestionData, Quiz, QuizQueryParams, QuizScore } from '../utils/types';

interface UseQuizStore {
  editQuiz: Quiz | null;
  quizFormActionType: ActionType | null;
  setQuizFormActionType: (type: ActionType | null) => void;
  setEditQuiz: (quiz: Quiz | null) => void;
  getAllQuizzes: (params: Partial<QuizQueryParams>) => Promise<Quiz[]>;
  getQuizById: (quizId: number) => Promise<Quiz>;
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
  createQuizQuestion: (data: QuestionData) => Promise<Quiz>;
  updateQuizQuestion: (questionId: number, data: QuestionData) => Promise<Quiz>;
  deleteQuizQuestion: (quizId: number, questionId: number) => Promise<void>;
  getQuizScores: (quizId: number) => Promise<QuizScore[]>;
}

const useQuizStore = create<UseQuizStore>((set) => ({
  editQuiz: null,
  quizFormActionType: null,

  setEditQuiz: (quiz: Quiz | null) => set({ editQuiz: quiz }),

  setQuizFormActionType: (type: ActionType | null) => set({ quizFormActionType: type }),

  getAllQuizzes: async (params: Partial<QuizQueryParams>) => {
    const response = await axiosQuizApi.get(`/`, {
      params,
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  },

  getQuizById: async (quizId: number) => {
    const response = await axiosQuizApi.get(`/${quizId}`, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  },

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
  },

  createQuizQuestion: async (data: QuestionData) => {
    const response = await axiosQuizQuestionApi.post('/', data, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  },

  updateQuizQuestion: async (questionId: number, data: QuestionData) => {
    const response = await axiosQuizQuestionApi.patch(`/${questionId}`, data, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  },

  deleteQuizQuestion: async (questionId: number, quizId: number) => {
    const response = await axiosQuizQuestionApi.delete(`/`, {
      params: { questionId, quizId },
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  },
  getQuizScores: async (quizId: number) => {
    const response = await axiosQuizApi.get(`/scores/${quizId}`, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  }
}));

export { useQuizStore };
