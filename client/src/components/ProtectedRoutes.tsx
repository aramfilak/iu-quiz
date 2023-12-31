import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore, usePersistStore, useStudentStore } from '../stores';
import { routes } from '../utils/routes';
import { Loading } from './Loading';

function ProtectedRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const { Authentication } = routes;
  const setStudentProfile = useStudentStore((state) => state.setStudentProfile);
  const getStudentsByIds = useStudentStore((state) => state.getStudentsByIds);
  const isAuthenticated = usePersistStore((state) => state.isAuthenticated);
  const signInStudentId = usePersistStore((state) => state.signInStudentId);
  const signOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  const redirectToSignInPage = () => {
    signOut();
    navigate(Authentication.children.SignIn.path);
  };

  useEffect(() => {
    if (isAuthenticated && signInStudentId) {
      getStudentsByIds(signInStudentId)
        .then((students) => {
          const studentProfile = students[0];

          setStudentProfile(studentProfile);
          setIsLoading(false);
        })
        .catch(() => redirectToSignInPage());
    } else {
      redirectToSignInPage();
    }
  }, []);

  return isLoading ? (
    <Loading minH="100vh" display="flex" justifyContent="center" alignItems="center" />
  ) : (
    <Outlet />
  );
}

export { ProtectedRoutes };
