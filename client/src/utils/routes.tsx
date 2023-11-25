import {
  Authentication,
  Dashboard,
  NotFound404,
  EmailVerification,
  Profile,
  FAQs,
  QuizEditor
} from '../pages';
import { FiHome, FiUser, FiHeart, FiEdit, FiSearch, FiCheckSquare } from 'react-icons/fi';
import { SignIn, SignUp } from '../pages/authentication';

const routes = {
  Authentication: {
    icon: FiHome,
    name: 'Authentication',

    element: <Authentication />,
    children: {
      SignIn: {
        name: 'Sign-In',
        path: '/',
        element: <SignIn />
      },
      SignUp: {
        name: 'Sign-Up',
        path: 'sign-up',
        element: <SignUp />
      }
    }
  },
  NotFound404: {
    icon: FiHome,
    name: 'Not Found 404',
    path: '*',
    element: <NotFound404 />
  },
  EmailVerification: {
    icon: FiHome,
    name: 'Email Verification',
    path: 'email-verification',
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
        element: <Profile />
      },
      SearchQuiz: {
        icon: FiSearch,
        name: 'Quiz Finden',
        path: 'find-quiz',
        element: <div>Editor Quiz</div>
      },
      ActiveQuiz: {
        icon: FiHeart,
        name: 'Meine Quiz',
        path: 'my-quizzes',
        element: <div>Meine Quiz</div>
      },
      QuizEditor: {
        icon: FiEdit,
        name: 'Quiz Editor',
        path: 'quiz-editor',
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
