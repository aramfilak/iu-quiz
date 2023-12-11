import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../stores';
import { routes } from '../../utils/routes';
import { CustomAlert } from '../../utils/types';

function EmailVerification() {
  const { verifyEmail } = useAuthStore();
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const emailVerificationToken = searchParams.get('emailVerificationToken');
  const navigate = useNavigate();

  useEffect(() => {
    setAlert({ status: 'loading', message: 'Es lädt...' });

    (async () => {
      if (!email || !emailVerificationToken) {
        return setAlert({ status: 'error', message: 'ungültiger Verifizierungslink' });
      }

      const { success, message } = await verifyEmail(email, emailVerificationToken);

      setAlert({ status: success ? 'success' : 'error', message: message });
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <Box
      minH="100vh"
      py={10}
      px={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Alert
        maxWidth="50rem"
        status={alert?.status}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="20rem"
        marginBottom="2rem"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          IU E-Mail Verifizierung
        </AlertTitle>
        <AlertDescription maxWidth="sm">{alert?.message}</AlertDescription>
      </Alert>
      {alert?.status === 'success' && (
        <Button
          onClick={() =>
            navigate(routes.Authentication.children.SignIn.path, { replace: true })
          }
          colorScheme="teal"
          size="md"
          marginBlock="1.5"
          padding="5"
        >
          Jetzt Anmelden
        </Button>
      )}
    </Box>
  );
}

export { EmailVerification };
