import './style.scss';
import PageView from '../../components/page-view';
import Container from '../../components/container';
import { Image } from '@chakra-ui/react';
import authenticationIllustration from '../../assets/illustrations/authentication-illustration.svg';
import SignIn from '../../components/sign-in';
import SignUp from '../../components/sign-up';
import { useAuthStore } from '../../sotres';

function Authentication() {
  const { showSignForm } = useAuthStore();
  return (
    <PageView>
      <Container additionalClasses={['authentication-container']}>
        {showSignForm ? <SignIn /> : <SignUp />}

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
