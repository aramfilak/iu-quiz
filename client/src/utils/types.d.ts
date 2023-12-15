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
  registrationDate: Date;
  studentProfile?: StudentProfile;
  quizFeedbacks: QuizFeedback[];
  quizzes: Quiz[];
  followedQuizzes: FollowedQuizzes[];
  quizQuestion: QuizQuestion[];
  scores: QuizScore[];
  lovedQuizzes: LovedQuiz[];
}

interface StudentProfile {
  id: number;
  name: string;
  location?: string;
  courseOfStudy?: string;
  xingUrl?: string;
  linkedinUrl?: string;
  student: Student;
  studentId: string;
  profileImage?: ProfileImage;
}

interface ProfileImage {
  id: number;
  publicId: string;
  url: string;
  studentProfile: StudentProfile;
  profileId: number;
}

interface Quiz {
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
  feedbacks: QuizFeedback[];
  scores: QuizScore[];
  lovedBy: LovedQuiz[];
}

interface FollowedQuizzes {
  student: Student;
  followerId: string;
  quiz: Quiz;
  quizId: number;
}

interface QuizQuestion {
  id: number;
  quizId: number;
  quiz: Quiz;
  question: string;
  quizAnswers: QuizAnswer[];
  student: Student;
  authorId: string;
}

interface QuizAnswer {
  id: number;
  answer: string;
  answerDescription?: string;
  isRightAnswer: boolean;
  quizQuestion: QuizQuestion;
  quizQuestionId: number;
}

interface QuizFeedback {
  id: number;
  feedback: string;
  createdAt: Date;
  author: Student;
  authorId: string;
  quiz: Quiz;
  quizId: number;
}

interface QuizScore {
  id: number;
  numberOfCorrectAnswers: number;
  timeTaken: number;
  score: number;
  quiz: Quiz;
  quizId: number;
  student?: Student;
  playerId?: string;
}

interface LovedQuiz {
  student: Student;
  loverId: string;
  quiz: Quiz;
  quizId: number;
}

export interface QuizQueryParams {
  page?: string;
  limit?: string;
  updatedAt?: boolean;
  popularity?: boolean;
  size?: boolean;
  courseOfStudy?: string;
  course?: string;
  sort?: string;
  authorId?: string;
  followed?: boolean;
  unFollowed?: boolean;
}
export interface QuestionData extends Partial<QuizQuestion> {
  quizAnswers: Partial<QuizAnswer>[];
}
