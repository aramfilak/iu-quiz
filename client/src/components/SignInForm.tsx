import { useRef, useState } from 'react';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { BiShow, BiHide } from 'react-icons/bi';
import { useAuthStore } from '../sotres';
import {
  Button,
  Text,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import { CustomAlert } from '../utils/types';

function SignInForm(rest: React.HTMLProps<HTMLFormElement>) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const { showSignUpForm, signIn } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert({ status: 'loading', message: 'Es lädt...' });
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (email && password) {
      const { success, message } = await signIn(email, password);
      if (success) {
        toast({ status: 'success', description: message });
        navigate(routes.Dashboard.path);
      } else {
        setAlert({ status: 'error', message: message });
      }
    } else {
      setAlert({ status: 'warning', message: 'Bitte alle Felder ausfüllen' });
    }
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '22rem', display: 'flex', flexDirection: 'column' }}
      {...rest}
    >
      <Text as="b" fontSize="4xl" color="teal.500" mb="1rem">
        Anmelden
      </Text>

      {/*------------------- Response Alert --------------------*/}
      {alert && (
        <Alert borderRadius="md" status={alert.status}>
          <AlertIcon />
          {alert.message}
        </Alert>
      )}

      {/*------------------- Email --------------------*/}
      <FormLabel mt="2" htmlFor="email">
        Email
      </FormLabel>
      <InputGroup>
        <Input
          ref={emailInputRef}
          borderColor="teal.500"
          autoComplete="on"
          id="email"
          placeholder="max.muster@iu-study.org"
        />
        <InputLeftElement>
          <RiMailLine />
        </InputLeftElement>
      </InputGroup>

      {/*------------------- Password --------------------*/}
      <FormLabel mt="2" htmlFor="password">
        Passwort
      </FormLabel>
      <InputGroup>
        <Input
          ref={passwordInputRef}
          borderColor="teal.500"
          autoComplete="on"
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Passwort eingeben"
        />
        <InputLeftElement>
          <RiLockPasswordLine />
        </InputLeftElement>
        <InputRightElement width="4.5rem">
          <Button size="xs" fontSize="1xl" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <BiShow /> : <BiHide />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {/*------------------- Form Submit -----------------*/}
      <Button disabled={isSubmitting} colorScheme="teal" type="submit" mt="4" mb="2">
        Anmelden
      </Button>

      <Text>
        Noch keinen Account?{' '}
        <Button
          type="button"
          variant="link"
          colorScheme="teal"
          fontWeight="extrabold"
          onClick={() => showSignUpForm()}
        >
          Jetzt registrieren
        </Button>
      </Text>
    </form>
  );
}

export { SignInForm };
