export interface IuQuizServerResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
}

export interface CustomAlert {
  status: 'info' | 'warning' | 'success' | 'error' | 'loading';
  message: string;
}
export interface StudentAuth {
  email: string;
  isVerified: boolean;
}

export interface ProfileImage {
  publicId: string;
  url: string;
  studentProfileId: string;
}

export interface StudentProfile {
  nickName: string;
  studentAuth: StudentAuth;
  profileImage: ProfileImage;
}
