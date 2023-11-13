import { Authentication, Dashboard, NotFound404, EmailVerification } from '../pages';

const routes = {
  Authentication: {
    name: 'Authentication',
    path: '/',
    element: <Authentication />
  },
  NotFound404: {
    name: 'Not Found 404',
    path: '*',
    element: <NotFound404 />
  },
  Dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />
  },
  EmailVerification: {
    name: 'Email Verification',
    path: '/email-verification',
    element: <EmailVerification />
  }
};

export { routes };
