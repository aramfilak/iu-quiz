import './style.css';
import PageNotFound404illustration from '../../assets/illustrations/page-not-found-illustration.svg';
import { Box, Button, Container, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

function NotFound404() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Container>
        <Image
          className="page-not-found-illustration"
          src={PageNotFound404illustration}
          alt="page not found illustration"
          maxWidth="30rem"
        />

        <Text fontSize={{ base: '1.2rem', md: '2rem' }} fontWeight="bold" mt={3} mb={2}>
          Ups..
        </Text>
        <Text color={'gray.500'} fontSize={{ base: '1rem', md: '1.6rem' }} mb={6}>
          Die von Ihnen gesuchte Website existiert nicht.
        </Text>
        <Button
          onClick={() => navigate(routes.Authentication.path, { replace: true })}
          colorScheme="teal"
          size={{ base: 'xs', md: 'sm' }}
          marginBlock="1.5"
          padding="5"
        >
          Zurück zur Startseite
        </Button>
      </Container>
    </Box>
  );
}

export { NotFound404 };
