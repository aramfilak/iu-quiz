import { Authentication, Dashboard, NotFound404, EmailVerification } from '../pages';
import { FiHome, FiSettings, FiStar, FiActivity } from 'react-icons/fi';

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
  Dashboard: {
    icon: FiHome,
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />
  },
  EmailVerification: {
    icon: FiHome,
    name: 'Email Verification',
    path: '/email-verification',
    element: <EmailVerification />
  },
  Settings: {
    icon: FiSettings,
    name: 'Einstellungen',
    path: '/settings',
    element: <EmailVerification />
  },
  QuizEditor: {
    icon: FiActivity,
    name: 'Quiz Editor',
    path: '/quiz-editor',
    element: <div>Editor Quiz</div>
  },
  ActiveQuiz: {
    icon: FiStar,
    name: 'Aktive Quiz',
    path: '/active-quiz',
    element: <div>Aktive Quiz</div>
  }
};

export { routes };
