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
  AlertIcon,
  useColorModeValue
} from '@chakra-ui/react';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { BiShow, BiHide, BiCheckShield } from 'react-icons/bi';
import { useAuthStore } from '../sotres';
import { CustomAlert } from '../utils/types';
import { LabelHeading } from '.';

function SignUpForm(rest: React.HTMLProps<HTMLFormElement>) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const { showSignInForm, singUp } = useAuthStore();
  const placeHolderColor = useColorModeValue('gray.800', 'gray.200');

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} {...rest}>
      <LabelHeading description="Registrieren" />
      {/*------------------- Response Alert --------------------*/}
      {alert && (
        <Alert status={alert.status}>
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
          autoComplete="on"
          id="email"
          placeholder="max.muster@iu-study.org"
          borderColor="teal.500"
          _placeholder={{ color: placeHolderColor }}
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
          autoComplete="on"
          id="password"
          type={showPassword ? 'text' : 'password'}
          borderColor="teal.500"
          placeholder="Passwort eingeben"
          _placeholder={{ color: placeHolderColor }}
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
      {/*---------------- Password Checklist---------------*/}
      <Box marginBlock="0.8rem">
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
      <FormLabel mt="2" htmlFor="passwordConfirm">
        Passwort bestätigen
      </FormLabel>
      <InputGroup>
        <Input
          ref={passwordConfirmInputRef}
          id="passwordConfirm"
          autoComplete="on"
          type={showPassword ? 'text' : 'password'}
          borderColor="teal.500"
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
      <Button colorScheme="teal" type="submit" disabled={isSubmitting} mt="4" mb="2">
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
