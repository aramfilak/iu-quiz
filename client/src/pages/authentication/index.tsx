import './style.scss';
import { PageView, Container, SignInForm, SignUpForm } from '../../components';
import { Image } from '@chakra-ui/react';
import authenticationIllustration from '../../assets/illustrations/authentication-illustration.svg';

import { useAuthStore } from '../../sotres';

function Authentication() {
  const { isShowSingInForm } = useAuthStore();
  return (
    <PageView>
      <Container additionalClasses={['authentication-container']}>
        {isShowSingInForm ? <SignInForm /> : <SignUpForm />}

        <Image
          className="authentication-illustration"
          maxWidth="29rem"
          src={authenticationIllustration}
          alt="authentication illustration"
        />
      </Container>
    </PageView>
  );
}

export { Authentication };
