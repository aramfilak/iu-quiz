import { Box, Flex, Image } from '@chakra-ui/react';
import signUpIll from '../../../assets/Mobile login-pana.svg';
import { SignUpForm } from '../../../components/forms';
import { HeadingLabel } from '../../../components/shared';

function SignUp() {
  return (
    <Box className="fade-out-animation">
      <HeadingLabel
        fontSize={{ base: '5xl', lg: '6xl' }}
        variant="colorful"
        textAlign={{ base: 'center', lg: 'start' }}
        description="Willkommen! Wir werden uns freuen, Sie dabei zu haben!"
        mb="10rem"
      />
      <Flex
        justify={{ base: 'center', lg: 'space-between' }}
        alignItems="center"
        gap={{ base: '8', lg: '12' }}
        flexWrap="wrap"
      >
        <SignUpForm style={{ flex: '1', minWidth: '25rem', maxWidth: '25rem' }} />
        <Image src={signUpIll} maxW="30rem" />
      </Flex>
    </Box>
  );
}

export { SignUp };
