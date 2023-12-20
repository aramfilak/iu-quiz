import { create } from 'zustand';
import { usePersistStore } from '.';
import { ActionType } from '../utils/enums';
import { axiosQuizApi, axiosQuizQuestionApi, axiosQuizFeedback } from '../utils/http';
import { QuestionData, Quiz, QuizQueryParams } from '../utils/types';

interface UseQuizStore {
  editQuiz: Quiz | null;
  quizFormActionType: ActionType | null;
  setQuizFormActionType: (type: ActionType | null) => void;
  setEditQuiz: (quiz: Quiz | null) => void;
  getAllQuizzes: (
    params: Partial<QuizQueryParams>
  ) => Promise<{ quizzes: Quiz[]; totalPages: number }>;
  getQuizById: (quizId: number) => Promise<Quiz>;
  createQuiz: (title: string, courseOfStudy: string, courseId: string) => Promise<void>;
  updateQuiz: (
    quizId: number,
    title: string,
    courseOfStudy: string,
    course: string
  ) => Promise<void>;
  deleteQuizById: (quizId: number) => Promise<void>;
  toggleLikeQuiz: (quizId: number) => Promise<void>;
  toggleFollowQuiz: (quizId: number) => Promise<void>;
  createQuizQuestion: (data: QuestionData) => Promise<void>;
  updateQuizQuestion: (questionId: number, data: QuestionData) => Promise<void>;
  deleteQuizQuestion: (quizId: number, questionId: number) => Promise<void>;
  createFeedback: (quizId: number, feedback: string) => Promise<void>;
  updateFeedback: (quizId: number, feedbackId: number, feedback: string) => Promise<void>;
  deleteFeedback: (quizId: number, feedbackId: number) => Promise<void>;
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

    return {
      quizzes: response.data.data.quizzes,
      totalPages: response.data.data.totalPages
    };
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

  toggleFollowQuiz: async (quizId: number) => {
    await axiosQuizApi.post(
      `/toggle-follow/${quizId}`,
      {},
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );
  },

  toggleLikeQuiz: async (quizId: number) => {
    await axiosQuizApi.post(
      `/toggle-like/${quizId}`,
      {},
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );
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

  createFeedback: async (quizId: number, feedback: string) => {
    const response = await axiosQuizFeedback.post(
      '/',
      {
        quizId,
        feedback
      },
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );

    return response.data.data;
  },
  updateFeedback: async (quizId: number, feedbackId: number, feedback: string) => {
    const response = await axiosQuizFeedback.patch(
      `/`,
      {
        quizId,
        feedbackId,
        feedback
      },
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );

    return response.data.data;
  },

  deleteFeedback: async (quizId: number, feedbackId: number) => {
    const response = await axiosQuizFeedback.delete(`/`, {
      params: { quizId, feedbackId },
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  }
}));

export { useQuizStore };
