import { Box, Flex, Image } from '@chakra-ui/react';
import signInIll from '../../assets/Mobile login-rafiki.svg';
import { LabelHeading, SignInForm } from '../../components';

const SignIn = () => {
  return (
    <Box className="fade-out-animation">
      <LabelHeading
        fontSize={{ base: '5xl', lg: '6xl' }}
        variant="colorful"
        textAlign={{ base: 'center', lg: 'start' }}
        description="Schön, Sie wiederzusehen! Wir freuen uns, dass Sie zurück sind."
        mb="10rem"
      />
      <Flex
        justify={{ base: 'center', lg: 'space-between' }}
        alignItems="center"
        gap={{ base: '8', lg: '12' }}
        flexWrap="wrap"
      >
        <SignInForm style={{ flex: '1', minWidth: '25rem', maxWidth: '25rem' }} />
        <Image src={signInIll} maxW="30rem" />
      </Flex>
    </Box>
  );
};

export { SignIn };
