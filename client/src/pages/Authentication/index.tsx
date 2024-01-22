import { Box, Container, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authBg from '../../assets/auth-page-bg.svg';
import { usePersistStore } from '../../stores';
import { routes } from '../../utils/routes';
import './style.css';

function Authentication() {
  const isAuthenticated = usePersistStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const { Dashboard } = routes;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(Dashboard.children.FindQuiz.path);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Image
        src={authBg}
        alt="Authentication background image"
        pos="absolute"
        minW="full"
        minH="full"
        className="auth-bg"
        objectFit="cover"
        zIndex="-1"
      />

      <Container
        maxW="container.lg"
        paddingBlock="2rem"
        minH="100vh"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export { SignIn } from './SignIn';
export { SignUp } from './SignUp';
export { Authentication };
