import { Outlet, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { useStudentStore, useAuthStore, usePersistStore } from '../../sotres';
import { useEffect, useState } from 'react';
import { Loading } from '../loading';

function ProtectedRoutes() {
  const { Authentication } = routes;
  const { getStudent } = useStudentStore();
  const { signOut } = useAuthStore();
  const { isAuthenticated } = usePersistStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const { success } = await getStudent();

        if (success) {
          return setIsLoading(false);
        }
      }

      signOut();
      navigate(Authentication.path);
      setIsLoading(false);
    })();

    //eslint-disable-next-line
  }, [isAuthenticated]);

  return isLoading ? (
    <Loading minH="100vh" display="flex" justifyContent="center" alignItems="center" />
  ) : (
    <Outlet />
  );
}

export { ProtectedRoutes };
