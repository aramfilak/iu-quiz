import { Authentication, Dashboard, NotFound404 } from '../pages';

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
  }
};

export { routes };
