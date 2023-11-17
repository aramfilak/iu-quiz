import { create } from 'zustand';
import { axiosStudentApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore } from './';

interface Student {
  nickName: string;
  email: string;
  image: string;
}

interface UseStudentStore {
  student: Student | null;
  getStudent: () => Promise<IuQuizServerResponse<Student>>;
  updateStudent: (data: Partial<Student>) => Promise<IuQuizServerResponse<Student>>;
  uploadImage: (image: FormData) => Promise<IuQuizServerResponse<Student>>;
  deleteImage: () => Promise<IuQuizServerResponse<Student>>;
}

const useStudentStore = create<UseStudentStore>((set, get) => ({
  student: null,

  getStudent: () =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.get('/', {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ student: response.data.data });
      return response.data;
    }),
  updateStudent: (data: Partial<Student>) =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.patch('/', data, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ student: response.data.data });
      return response.data;
    }),
  uploadImage: (image: FormData) =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.post('/image', image, {
        headers: {
          Authorization: usePersistStore.getState().accessToken,
          'Content-Type': 'multipart/form-data'
        }
      });
      set({ student: response.data.data });
      return response.data;
    }),
  deleteImage: () =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.delete('/image', {
        headers: {
          Authorization: usePersistStore.getState().accessToken
        },
        data: {
          imageUrl: get().student?.image
        }
      });
      set({ student: response.data.data });
      return response.data;
    })
}));

export { useStudentStore };
