import { Outlet, useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import { useStudentStore, useAuthStore, usePersistStore } from '../stores';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';

function ProtectedRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const { Authentication } = routes;
  const { getStudent } = useStudentStore();
  const { signOut } = useAuthStore();
  const { isAuthenticated } = usePersistStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const { success } = await getStudent();

        if (success) {
          return setIsLoading(false);
        }
      }

      signOut();
      navigate(Authentication.children.SignIn.path);
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <Loading minH="100vh" display="flex" justifyContent="center" alignItems="center" />
  ) : (
    <Outlet />
  );
}

export { ProtectedRoutes };
