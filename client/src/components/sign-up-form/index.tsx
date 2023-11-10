import { Form, Field, Formik, FieldProps, FormikHelpers } from 'formik';
import { useState } from 'react';
import {
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
  Box,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { BiShow, BiHide, BiCheckShield } from 'react-icons/bi';
import { useAuthStore } from '../../sotres';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: FormValues = { email: '', password: '', passwordConfirm: '' };

function SignUpForm() {
  const { showSignInForm, singUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (
    { email, password, passwordConfirm }: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    if (password !== passwordConfirm) {
      return toast({
        description: 'Passwörter müssen identisch sein',
        status: 'error'
      });
    }

    const { success, message } = await singUp(email, password);

    toast({
      description: message,
      status: success ? 'success' : 'error'
    });

    setSubmitting(false);

    if (success) {
      navigate(routes.Dashboard.path);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <Form>
          <Text as="b" fontSize="4xl" color="teal.500">
            Registrieren
          </Text>

          {/*------------------- Email --------------------*/}

          <Field name="email">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>

                <InputGroup>
                  <Input
                    borderColor="teal.500"
                    autoComplete="on"
                    {...field}
                    id="email"
                    placeholder="max.muster@iu-study.org"
                  />
                  <InputLeftElement>
                    <RiMailLine />
                  </InputLeftElement>
                </InputGroup>
              </FormControl>
            )}
          </Field>

          {/*------------------- Password --------------------*/}

          <Field name="password">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel htmlFor="password">Passwort</FormLabel>
                <InputGroup>
                  <Input
                    borderColor="teal.500"
                    autoComplete="on"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Passwort eingeben"
                    {...field}
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
              </FormControl>
            )}
          </Field>
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

          <Field name="passwordConfirm">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel htmlFor="passwordConfirm">Passwort bestätigen</FormLabel>
                <InputGroup>
                  <Input
                    borderColor="teal.500"
                    id="passwordConfirm"
                    autoComplete="on"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Passwort bestätigen"
                    {...field}
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
              </FormControl>
            )}
          </Field>

          {/*------------------- Form Submit -----------------*/}

          <Button colorScheme="teal" type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
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
        </Form>
      )}
    </Formik>
  );
}

export { SignUpForm };
