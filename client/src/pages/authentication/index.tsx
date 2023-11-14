import './style.scss';
import { PageView, Container, SignInForm, SignUpForm } from '../../components';
import authenticationIllustration01 from '../../assets/illustrations/authentication-illustration.svg';
import { Box, Image } from '@chakra-ui/react';
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
      navigate(Dashboard.path);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <PageView>
      <Container additionalClasses={['authentication-container']}>
        {isShowSingInForm ? <SignInForm /> : <SignUpForm />}
        <Box className="auth-illustration-box">
          <Image src={authenticationIllustration01} alt="authentication illustration" />
        </Box>
      </Container>
    </PageView>
  );
}

export { Authentication };
