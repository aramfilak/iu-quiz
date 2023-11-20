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
  isVerified: boolean;
  studentProfile?: StudentProfile;
  Quiz: Quiz[];
}

export interface StudentProfile {
  id: string;
  name: string;
  courseOfStudy?: string;
  studyFormats?: string;
  location?: string;
  xingUrl?: string;
  linkedinUrl?: string;
  student: Student;
  studentId: string;
  profileImage?: ProfileImage;
  registrationDate: Date;
}

export interface ProfileImage {
  publicId: string;
  url: string;
  studentProfile: StudentProfile;
  profileId: string;
}

export interface Quiz {
  id: string;
  student: Student;
  studentId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  size: number;
  popularity: number;
  quizQuestions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quiz: Quiz;
  quizId: string;
  question: string;
  quizAnswers: QuizAnswer[];
}

export interface QuizAnswer {
  answer: string;
  answerDescription?: string;
  isRightAnswer: boolean;
  quizQuestion: QuizQuestion;
  quizQuestionId: string;
}
