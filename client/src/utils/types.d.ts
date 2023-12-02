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
  email: string;
  emailVerificationToken: string;
  registrationDate: Date;
  studentProfile?: StudentProfile;
  Quiz: Quiz[];
  followedQuizzes: FollowedQuizzes[];
}

export interface StudentProfile {
  id: number;
  name: string;
  location?: string | null;
  courseOfStudy?: string | null;
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
  authorId: string;
  title: string;
  updatedAt: Date;
  size: number;
  popularity: number;
  courseOfStudy: string;
  course: string;
  quizQuestions: QuizQuestion[];
  followedBy: FollowedQuizzes[];
}

export interface FollowedQuizzes {
  student: Student;
  followerId: string;
  quiz: Quiz;
  quizId: number;
}

export interface QuizQuestion {
  id: number;
  quiz: Quiz;
  quizId: number;
  question: string;
  quizAnswers: QuizAnswer[];
}

export interface QuizAnswer {
  id: number;
  answer: string;
  answerDescription?: string | null;
  isRightAnswer: boolean;
  quizQuestion: QuizQuestion;
  quizQuestionId: number;
}

export interface QuizQueryParams {
  page?: string;
  limit?: string;
  updatedAt?: string;
  popularity?: string;
  size?: string;
  courseOfStudy?: string;
  course?: string;
  sort?: string;
  authorId?: string;
  followed?: boolean;
  unFollowed?: boolean;
}
