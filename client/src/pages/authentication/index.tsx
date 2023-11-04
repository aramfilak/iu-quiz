import './style.scss';
import PageView from '../../components/page-view';
import Container from '../../components/container';
import { Image } from '@chakra-ui/react';
import authenticationIllustration from '../../assets/illustrations/authentication-illustration.svg';
import SignIn from '../../components/sign-in';

function Authentication() {
  return (
    <PageView>
      <Container additionalClasses={['authentication-container']}>
        <SignIn />
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
