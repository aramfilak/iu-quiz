import {
  FiCheckSquare,
  FiEdit,
  FiHeart,
  FiHome,
  FiSearch,
  FiSettings,
  FiUser
} from 'react-icons/fi';
import { NotFound404 } from '../pages/404';
import { Authentication, SignIn, SignUp } from '../pages/Authentication';
import {
  Dashboard,
  FAQs,
  FindQuiz,
  MyQuizzes,
  Profile,
  QuestionsEditor,
  Quiz,
  Settings
} from '../pages/Dashboard';
import { EmailVerification } from '../pages/EmailVerification';

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
        isSidebarItem: false,
        icon: FiUser,
        name: 'Profile ',
        path: 'profile/:studentId',
        mainPath: 'profile',
        element: <Profile />
      },

      FindQuiz: {
        isSidebarItem: true,
        icon: FiSearch,
        name: 'Quiz Finden',
        path: 'find-quiz',
        mainPath: 'find-quiz',
        element: <FindQuiz />
      },
      MyQuizzes: {
        isSidebarItem: true,
        icon: FiHeart,
        name: 'Meine Quiz',
        path: 'my-quizzes',
        mainPath: 'my-quizzes',
        element: <MyQuizzes />
      },
      Settings: {
        isSidebarItem: true,
        icon: FiSettings,
        name: 'Einstellungen ',
        path: 'settings',
        mainPath: 'settings',
        element: <Settings />
      },
      FAQs: {
        isSidebarItem: true,
        icon: FiCheckSquare,
        name: 'FAQs',
        path: 'faqs',
        element: <FAQs />
      },
      QuestionsEditor: {
        isSidebarItem: false,
        icon: FiEdit,
        name: 'Questions Editor',
        path: 'questions-editor/:quizId',
        mainPath: 'questions-editor',
        element: <QuestionsEditor />
      },
      Quiz: {
        isSidebarItem: false,
        name: 'Quiz',
        path: 'quiz/:quizId',
        mainPath: 'quiz',
        element: <Quiz />
      }
    }
  }
} as const;

export { routes };
