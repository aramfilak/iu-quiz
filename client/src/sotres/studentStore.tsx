import { create } from 'zustand';
import { axiosStudentApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore } from './';

interface Student {
  nickName: string;
  email: string;
}

interface UseStudentStore {
  student: Student | null;
  getStudent: () => Promise<IuQuizServerResponse<Student>>;
}

const useStudentStore = create<UseStudentStore>((set) => ({
  student: null,

  getStudent: () =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.get('/', {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ student: response.data.data });
      return response.data;
    })
}));

export { useStudentStore };
