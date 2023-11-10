import { Outlet, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { useStudentStore, useAuthStore } from '../../sotres';
import { useEffect, useState } from 'react';
import { Loading } from '../loading';

function ProtectedRoutes() {
  const { Authentication } = routes;
  const { getStudent } = useStudentStore();
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { success } = await getStudent();

      if (success) {
        localStorage.setItem('is_authenticated', 'true');
        setIsLoading(false);
      } else {
        await signOut();
        setIsLoading(false);
        navigate(Authentication.path);
      }
    })();
  }, []);

  return isLoading ? <Loading fullScreen /> : <Outlet />;
}

export { ProtectedRoutes };
