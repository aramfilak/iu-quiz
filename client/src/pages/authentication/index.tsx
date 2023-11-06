import './style.scss';
import PageView from '../../components/page-view';
import Container from '../../components/container';
import { Image } from '@chakra-ui/react';
import authenticationIllustration from '../../assets/illustrations/authentication-illustration.svg';
import SignInForm from '../../components/sign-in-form';
import SignUpForm from '../../components/sign-up-form';
import { useAuthStore } from '../../sotres';

function Authentication() {
  const { showSignForm } = useAuthStore();
  return (
    <PageView>
      <Container additionalClasses={['authentication-container']}>
        {showSignForm ? <SignInForm /> : <SignUpForm />}

        <Image
          className="authentication-illustration"
          maxWidth="30rem"
          src={authenticationIllustration}
          alt="authentication illustration"
        />
      </Container>
    </PageView>
  );
}

export default Authentication;
