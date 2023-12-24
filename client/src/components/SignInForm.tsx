import {
  Alert,
  AlertIcon,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { routes } from '../utils/routes';
import { CustomAlert } from '../utils/types';
import { HeadingLabel } from '.';
import { parseJsonDataFromFormData } from '../utils/helpers';

interface FormType {
  email: string;
  password: string;
}

function SignInForm(rest: React.HTMLProps<HTMLFormElement>) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const signIn = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert({ status: 'loading', message: 'Es lädt...' });

    const { email, password } = parseJsonDataFromFormData<FormType>(e);

    if (email && password) {
      const { success, message } = await signIn(email, password);
      if (success) {
        toast({ status: 'success', description: message });
        navigate(routes.Dashboard.children.FindQuiz.path);
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
      style={{ display: 'flex', flexDirection: 'column' }}
      {...rest}
    >
      {/*------------------- Response Alert --------------------*/}
      {alert && (
        <Alert status={alert.status}>
          <AlertIcon />
          {alert.message}
        </Alert>
      )}

      <HeadingLabel
        fontSize={{ base: '4xl', lg: '5xl' }}
        variant="solid"
        description="Anmelden"
      />
      {/*------------------- Email --------------------*/}
      <FormLabel mt="2" htmlFor="email">
        Email
      </FormLabel>
      <InputGroup>
        <Input
          borderColor="teal.500"
          autoComplete="on"
          id="email"
          name="email"
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
          borderColor="teal.500"
          autoComplete="on"
          id="password"
          name="password"
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
      <Button
        disabled={isSubmitting}
        colorScheme="teal"
        type="submit"
        mt="4"
        mb="2"
        width="full"
      >
        Anmelden
      </Button>

      <Text>
        Noch keinen Account?{' '}
        <Button
          type="button"
          variant="link"
          colorScheme="teal"
          fontWeight="extrabold"
          onClick={() => navigate(routes.Authentication.children.SignUp.path)}
        >
          Jetzt registrieren
        </Button>
      </Text>
    </form>
  );
}

export { SignInForm };
