import './style.css';
import { SignInForm, SignUpForm } from '../../components';
import authenticationIllustration01 from '../../assets/illustrations/authentication-illustration.svg';
import { Box, Container, Image } from '@chakra-ui/react';
import { useAuthStore, usePersistStore } from '../../sotres';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

function Authentication() {
  const { isShowSingInForm } = useAuthStore();
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
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignContent="center"
      overflowX="hidden"
    >
      <Container
        className="auth-container"
        maxW="container.lg"
        display={{ base: 'flex' }}
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        gap="4rem"
      >
        {isShowSingInForm ? <SignInForm /> : <SignUpForm />}
        <Image
          src={authenticationIllustration01}
          alt="authentication illustration"
          width={{ base: '20rem', md: '25rem', xl: '27rem' }}
        />
      </Container>
    </Box>
  );
}

export { Authentication };
