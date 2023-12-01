import { FiHome, FiUser, FiHeart, FiEdit, FiSearch, FiCheckSquare } from 'react-icons/fi';
import {
  Authentication,
  Dashboard,
  NotFound404,
  EmailVerification,
  Profile,
  FAQs,
  MyQuizzes,
  SignIn,
  SignUp,
  QuizEditor,
  FindQuiz
} from '../pages';

const routes = {
  Authentication: {
    icon: FiHome,
    name: 'Authentication',
    element: <Authentication />,
    children: {
      SignIn: {
        name: 'Sign-In',
        path: '/',
        mainPath: '/',
        element: <SignIn />
      },
      SignUp: {
        name: 'Sign-Up',
        mainPath: 'sign-up',
        path: 'sign-up',
        element: <SignUp />
      }
    }
  },
  NotFound404: {
    icon: FiHome,
    name: 'Not Found 404',
    path: '*',
    mainPath: '*',
    element: <NotFound404 />
  },
  EmailVerification: {
    icon: FiHome,
    name: 'Email Verification',
    path: 'email-verification',
    mainPath: 'email-verification',
    element: <EmailVerification />
  },
  Dashboard: {
    icon: FiHome,
    name: 'Dashboard',
    element: <Dashboard />,
    children: {
      Profile: {
        icon: FiUser,
        name: 'Profile',
        path: 'profile',
        mainPath: 'profile',
        element: <Profile />
      },
      SearchQuiz: {
        icon: FiSearch,
        name: 'Quiz Finden',
        path: 'find-quiz',
        mainPath: 'find-quiz',
        element: <FindQuiz />
      },
      ActiveQuiz: {
        icon: FiHeart,
        name: 'Meine Quiz',
        path: 'my-quizzes',
        mainPath: 'my-quizzes',
        element: <MyQuizzes />
      },
      QuizEditor: {
        icon: FiEdit,
        name: 'Quiz Editor',
        path: 'quiz-editor/:quizId',
        mainPath: 'quiz-editor',
        element: <QuizEditor />
      },
      FAQs: {
        icon: FiCheckSquare,
        name: 'FAQs',
        path: 'faqs',
        element: <FAQs />
      }
    }
  }
};

export { routes };
