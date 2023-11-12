import { useRef, useState } from 'react';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { BiShow, BiHide } from 'react-icons/bi';
import { useAuthStore } from '../../sotres';
import {
  Button,
  Text,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

function SignInForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { showSignUpForm, signIn } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    if (email && password) {
      const { success, message } = await signIn(email, password);

      toast({
        description: message,
        status: success ? 'success' : 'error'
      });

      if (success) {
        navigate(routes.Dashboard.path);
      }
    }
    setIsSubmitting((prv) => !prv);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text as="b" fontSize="4xl" color="teal.500">
        Anmelden
      </Text>

      {/*------------------- Email --------------------*/}

      <FormLabel htmlFor="email">Email</FormLabel>
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

      <FormLabel htmlFor="password">Passwort</FormLabel>
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

      <Button
        onClick={() => setIsSubmitting((prv) => !prv)}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        colorScheme="teal"
        type="submit"
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
          onClick={() => showSignUpForm()}
        >
          Jetzt registrieren
        </Button>
      </Text>
    </form>
  );
}

export { SignInForm };
