import { create } from 'zustand';
import { axiosStudentApi, asyncHandler } from '../utils/http';
import { IuQuizServerResponse } from '../utils/types';
import { usePersistStore } from '.';
import { StudentProfile } from '../utils/types';

interface UseStudentStore {
  studentProfile: StudentProfile | null;
  getStudent: () => Promise<IuQuizServerResponse<StudentProfile>>;
  updateStudent: (data: Partial<StudentProfile>) => Promise<IuQuizServerResponse<StudentProfile>>;
  deleteStudent: () => Promise<IuQuizServerResponse<StudentProfile>>;
  uploadImage: (image: FormData) => Promise<IuQuizServerResponse<StudentProfile>>;
  deleteImage: () => Promise<IuQuizServerResponse<StudentProfile>>;
}

const useStudentStore = create<UseStudentStore>((set) => ({
  studentProfile: null,

  getStudent: () =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.get('/', {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ studentProfile: response.data.data });
      return response.data;
    }),
  updateStudent: (data: Partial<StudentProfile>) =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.patch('/', data, {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ studentProfile: response.data.data });
      return response.data;
    }),
  deleteStudent: () =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.delete('/', {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });
      set({ studentProfile: response.data.data });

      return response.data;
    }),
  uploadImage: (profileImage: FormData) =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.post('/profile-image', profileImage, {
        headers: {
          Authorization: usePersistStore.getState().accessToken,
          'Content-Type': 'multipart/form-data'
        }
      });
      set({ studentProfile: response.data.data });
      return response.data;
    }),
  deleteImage: () =>
    asyncHandler(async () => {
      const response = await axiosStudentApi.delete('/profile-image', {
        headers: {
          Authorization: usePersistStore.getState().accessToken
        }
      });
      set({ studentProfile: response.data.data });
      return response.data;
    })
}));

export { useStudentStore };
