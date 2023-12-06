import { create } from 'zustand';
import { axiosQuizApi } from '../utils/http';
import { QuizQueryParams } from '../utils/types';
import { usePersistStore } from '.';
import { Quiz } from '../utils/types';
import { ActionType } from '../utils/enums';

interface Answer {
  answer: string;
  answerDescription: string;
  isRightAnswer: boolean;
}

interface QuizQuestionData {
  question: string;
  answers: Answer[];
}

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
  createQuizQuestion: (data: QuizQuestionData) => Promise<Quiz>;
  updateQuizQuestion: (questionId: number, data: QuizQuestionData) => Promise<Quiz>;
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

  createQuizQuestion: async (data: QuizQuestionData) => {
    const response = await axiosQuizApi.post('/question', data, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  },
  updateQuizQuestion: async (questionId: number, data: QuizQuestionData) => {
    const response = await axiosQuizApi.patch(`/follow/${questionId}`, data, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  }
}));

export { useQuizStore };
