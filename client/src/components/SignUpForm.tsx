import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiCheckShield, BiHide, BiShow } from 'react-icons/bi';
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
  passwordConfirm: string;
}

function SignUpForm(rest: React.HTMLProps<HTMLFormElement>) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const singUp = useAuthStore((state) => state.singUp);
  const placeHolderColor = useColorModeValue('gray.800', 'gray.200');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert({ status: 'loading', message: 'Es lädt...' });

    const { email, password, passwordConfirm } = parseJsonDataFromFormData<FormType>(e);
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
        description="Registrieren"
      />
      {/*------------------- Email --------------------*/}
      <FormLabel mt="2" htmlFor="email">
        Email
      </FormLabel>
      <InputGroup>
        <Input
          name="email"
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
          name="password"
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
          name="passwordConfirm"
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

      <Button
        colorScheme="teal"
        type="submit"
        disabled={isSubmitting}
        mt="4"
        mb="2"
        width="full"
      >
        Registrieren
      </Button>
      <Text>
        Account vorhanden?{' '}
        <Button
          type="button"
          variant="link"
          colorScheme="teal"
          fontWeight="extrabold"
          onClick={() => navigate(routes.Authentication.children.SignIn.path)}
        >
          Jetzt anmelden
        </Button>
      </Text>
    </form>
  );
}

export { SignUpForm };
