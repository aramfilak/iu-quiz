import { create } from 'zustand';
import { usePersistStore } from '.';
import { asyncHandler, axiosStudentApi } from '../utils/http';
import { IuQuizServerResponse, StudentProfile } from '../utils/types';

interface UseStudentStore {
  studentProfile: StudentProfile | null;
  updateStudent: (
    data: Partial<StudentProfile>
  ) => Promise<IuQuizServerResponse<StudentProfile>>;
  setStudentProfile: (studentProfile: StudentProfile | null) => void;
  deleteStudent: () => Promise<void>;
  uploadImage: (image: FormData) => Promise<void>;
  deleteImage: () => Promise<void>;
  sendContactEmail: (subject: string, description: string) => Promise<void>;
  getStudentsByIds: (...studentsIds: string[]) => Promise<StudentProfile[]>;
}

const useStudentStore = create<UseStudentStore>((set) => ({
  studentProfile: null,

  setStudentProfile: (studentProfile: StudentProfile | null) => set({ studentProfile }),

  getStudentsByIds: async (...studentsIds: string[]) => {
    const response = await axiosStudentApi.get(`/${studentsIds.join(',')}`, {
      headers: { Authorization: usePersistStore.getState().accessToken }
    });

    return response.data.data;
  },

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
      await axiosStudentApi.delete('/', {
        headers: { Authorization: usePersistStore.getState().accessToken }
      });

      set({ studentProfile: null });
    }),

  uploadImage: async (profileImage: FormData) => {
    const response = await axiosStudentApi.post('/profile-image', profileImage, {
      headers: {
        Authorization: usePersistStore.getState().accessToken,
        'Content-Type': 'multipart/form-data'
      }
    });

    set({ studentProfile: response.data.data });
  },

  deleteImage: async () => {
    const response = await axiosStudentApi.delete('/profile-image', {
      headers: {
        Authorization: usePersistStore.getState().accessToken
      }
    });

    set({ studentProfile: response.data.data });
  },

  sendContactEmail: async (subject: string, description: string) => {
    await axiosStudentApi.post(
      '/send-email',
      {
        subject,
        description
      },
      {
        headers: { Authorization: usePersistStore.getState().accessToken }
      }
    );
  }
}));

export { useStudentStore };
