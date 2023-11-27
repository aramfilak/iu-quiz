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

export interface Student {
  id: string;
  email: string;
  password: string;
  isVerified: boolean;
  emailVerificationToken: string;
  studentProfile?: StudentProfile;
  Quiz: Quiz[];
  registrationDate: Date;
}

export interface StudentProfile {
  id: number;
  name: string;
  courseOfStudy?: string | null;
  studyFormat?: string | null;
  location?: string | null;
  xingUrl?: string | null;
  linkedinUrl?: string | null;
  student: Student;
  studentId: string;
  profileImage?: ProfileImage;
}

export interface ProfileImage {
  publicId: string;
  url: string;
  studentProfile: StudentProfile;
  profileId: number;
}

export interface Quiz {
  id: number;
  student: Student;
  studentId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  size: number;
  popularity: number;
  courseOfStudy: string;
  quizQuestions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  quiz: Quiz;
  quizId: number;
  question: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  id: number;
  answer: string;
  answerDescription?: string | null;
  isRightAnswer: boolean;
  quizQuestion: QuizQuestion;
  quizQuestionId: number;
}
