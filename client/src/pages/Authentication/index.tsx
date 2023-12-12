import { Box, Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authBg from '../../assets/auth-page-bg.svg';
import { usePersistStore } from '../../stores';
import { routes } from '../../utils/routes';
import './style.css';

function Authentication() {
  const { isAuthenticated } = usePersistStore();
  const navigate = useNavigate();
  const { Dashboard } = routes;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(Dashboard.children.FindQuiz.path);
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

export { SignIn } from './SignIn';
export { SignUp } from './SignUp';
export { Authentication };
