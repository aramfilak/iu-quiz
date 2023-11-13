import { Outlet, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { useStudentStore, useAuthStore, usePersistStore } from '../../sotres';
import { useEffect, useState } from 'react';
import { Loading } from '../loading';

function ProtectedRoutes() {
  const { Authentication } = routes;
  const { getStudent } = useStudentStore();
  const { signOut } = useAuthStore();
  const { setIsAuthenticated, isAuthenticated } = usePersistStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const { success } = await getStudent();

        if (success) {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      }

      signOut();
      navigate(Authentication.path);
      setIsLoading(false);
    })();

    //eslint-disable-next-line
  }, [isAuthenticated]);

  return isLoading ? <Loading fullScreen /> : <Outlet />;
}

export { ProtectedRoutes };
