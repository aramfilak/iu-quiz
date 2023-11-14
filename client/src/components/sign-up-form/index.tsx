import { useRef, useState } from 'react';
import {
  Button,
  Text,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { BiShow, BiHide, BiCheckShield } from 'react-icons/bi';
import { useAuthStore } from '../../sotres';
import { CustomAlert } from '../../utils/types';

function SignUpForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const { showSignInForm, singUp } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert({ status: 'loading', message: 'Es lädt...' });
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const passwordConfirm = passwordConfirmInputRef.current?.value;
    const passwordMatch = password === passwordConfirm;

    if (!passwordMatch) {
      setAlert({ status: 'warning', message: 'Passwörter müssen identisch sein' });
      return setIsSubmitting(false);
    }

    if (email && password && passwordMatch) {
      const { success, message } = await singUp(email, password);

      setAlert({ status: success ? 'success' : 'error', message: message });
    } else {
      setAlert({ status: 'warning', message: 'Bitte alle Felder ausfüllen' });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text as="b" fontSize="4xl" color="teal.500">
        Registrieren
      </Text>

      {/*------------------- Response Alert --------------------*/}
      {alert && (
        <Alert borderRadius="md" status={alert.status}>
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
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

      <Box>
        <Text fontSize="sm" fontWeight="bold"></Text>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={BiCheckShield} color="teal.500" />
            Mindestens acht Zeichen{' '}
          </ListItem>
          <ListItem>
            <ListIcon as={BiCheckShield} color="teal.500" />
            Mindestens ein Buchstabe
          </ListItem>
          {/* You can also use custom icons from react-icons */}
          <ListItem>
            <ListIcon as={BiCheckShield} color="teal.500" />
            Mindestens eine Zahl
          </ListItem>
        </List>
      </Box>
      {/*---------------- Confirm Password ---------------*/}

      <FormLabel htmlFor="passwordConfirm">Passwort bestätigen</FormLabel>
      <InputGroup>
        <Input
          ref={passwordConfirmInputRef}
          borderColor="teal.500"
          id="passwordConfirm"
          autoComplete="on"
          type={showPassword ? 'text' : 'password'}
          placeholder="Passwort bestätigen"
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

      <Button colorScheme="teal" type="submit" disabled={isSubmitting}>
        Registrieren
      </Button>

      <Text>
        Account vorhanden?{' '}
        <Button
          type="button"
          variant="link"
          colorScheme="teal"
          fontWeight="extrabold"
          onClick={() => showSignInForm()}
        >
          Jetzt anmelden
        </Button>
      </Text>
    </form>
  );
}

export { SignUpForm };
