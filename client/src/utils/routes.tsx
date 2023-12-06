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
  QuestionsEditor,
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
        isSidebarItem: true,
        icon: FiUser,
        name: 'Profile',
        path: 'profile',
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
      PlayQuiz: {
        isSidebarItem: false,
        icon: FiEdit,
        name: 'Play Quiz',
        path: 'play-quiz/:quizId',
        mainPath: 'play-quiz',
        element: <QuestionsEditor />
      }
    }
  }
};

export { routes };
