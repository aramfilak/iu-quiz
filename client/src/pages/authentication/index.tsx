import './style.scss';
import { PageView, Container, SignInForm, SignUpForm } from '../../components';
import authenticationIllustration01 from '../../assets/illustrations/authentication-illustration01.svg';
import { useAuthStore } from '../../sotres';
import { Box, Image } from '@chakra-ui/react';

function Authentication() {
  const { isShowSingInForm } = useAuthStore();
  return (
    <PageView>
      <Container additionalClasses={['authentication-container']}>
        {isShowSingInForm ? <SignInForm /> : <SignUpForm />}{' '}
        <Box className="auth-illustration-box">
          <Image src={authenticationIllustration01} alt="authentication illustration" />
        </Box>
      </Container>
    </PageView>
  );
}

export { Authentication };
