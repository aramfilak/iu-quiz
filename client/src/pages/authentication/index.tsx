import './style.css';
import { Box, Container } from '@chakra-ui/react';
import { usePersistStore } from '../../stores';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import authBg from '../../assets/auth-page-bg.svg';

function Authentication() {
  const { isAuthenticated } = usePersistStore();
  const navigate = useNavigate();
  const { Dashboard } = routes;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(Dashboard.children.Profile.path);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Box backgroundImage={authBg} backgroundSize="cover" backgroundRepeat="no-repeat">
      <Container
        maxW="container.lg"
        minH="100vh"
        display="flex"
        flexDir="column"
        justifyContent="center"
        pt="20"
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export { Authentication, SignIn, SignUp };
