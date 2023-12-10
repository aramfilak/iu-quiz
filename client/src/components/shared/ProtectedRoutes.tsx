import { Outlet, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { useStudentStore, useAuthStore, usePersistStore } from '../../stores';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';

function ProtectedRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const { Authentication } = routes;
  const { getStudentsByIds, setStudentProfile } = useStudentStore();
  const { signOut } = useAuthStore();
  const { isAuthenticated, signInStudentId } = usePersistStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (isAuthenticated && signInStudentId) {
        const profiles = await getStudentsByIds(signInStudentId);
        const studentProfile = profiles[0];

        if (studentProfile) {
          setStudentProfile(studentProfile);
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
