import { Authentication, Dashboard, NotFound404, EmailVerification, Profile } from '../pages';
import {
  FiHome,
  FiUser,
  FiSettings,
  FiHeart,
  FiEdit,
  FiSearch,
  FiCheckSquare
} from 'react-icons/fi';

const routes = {
  Authentication: {
    icon: FiHome,
    name: 'Authentication',
    path: '/',
    element: <Authentication />
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
    path: 'dashboard',
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
        name: 'Quiz Suchen',
        path: 'quiz-search',
        element: <div>Editor Quiz</div>
      },
      ActiveQuiz: {
        icon: FiHeart,
        name: 'Meine Quizze',
        path: 'active-quiz',
        element: <div>Meine Quiz</div>
      },
      QuizEditor: {
        icon: FiEdit,
        name: 'Quiz Editor',
        path: 'quiz-editor',
        element: <div>Editor Quiz</div>
      },
      Settings: {
        icon: FiSettings,
        name: 'Einstellungen',
        path: 'settings',
        element: <div>Einstellungen</div>
      },
      FAQs: {
        icon: FiCheckSquare,
        name: 'FAQs',
        path: 'faqs',
        element: <div>FAQs</div>
      }
    }
  }
};

export { routes };
