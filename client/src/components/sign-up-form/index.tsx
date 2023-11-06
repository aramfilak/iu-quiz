import './style.scss';
import { Form, Field, Formik, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { BiShow, BiHide } from 'react-icons/bi';
import { useAuthStore } from '../../sotres';

const isRequiredMessage = 'Pflichtfeld *';

const validationSchema = Yup.object({
  email: Yup.string()
    .required(isRequiredMessage)
    .trim()
    .email('Ungültige IU-E-Mail')
    .matches(/@[iI][uU][bB][hH]-fernstudium\.de$|@iu-study\.org$/i, {
      message: 'Ungültige IU-E-Mail'
    }),
  password: Yup.string().required(isRequiredMessage).trim().min(8, 'Mindestens 8 Zeichen'),
  passwordConfirm: Yup.string()
    .required(isRequiredMessage)
    .trim()
    .oneOf([Yup.ref('password')], 'Passwörter müssen übereinstimmen')
});

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialValues: FormValues = { email: '', password: '', passwordConfirm: '' };

function singUpForm() {
  const { toggleAuthForm, singUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (
    { email, password }: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    singUp(email, password);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text as="b" fontSize="4xl" color="deep-teal">
              Registrieren
            </Text>

            {/*------------------- Email --------------------*/}

            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <FormLabel htmlFor="email">Email</FormLabel>

                  <InputGroup>
                    <Input
                      borderColor={'light-gray'}
                      autoComplete="on"
                      {...field}
                      id="email"
                      placeholder="max.muster@iu-study.org"
                    />
                    <InputLeftElement>
                      <RiMailLine />
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/*------------------- Password --------------------*/}

            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <FormLabel htmlFor="password">Passwort</FormLabel>
                  <InputGroup>
                    <Input
                      borderColor={'light-gray'}
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
                      <Button
                        size="xs"
                        fontSize="1xl"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <BiShow /> : <BiHide />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/*---------------- Confirm Password ---------------*/}

            <Field name="passwordConfirm">
              {({ field, meta }: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <FormLabel htmlFor="passwordConfirm">Passwort bestätigen</FormLabel>
                  <InputGroup>
                    <Input
                      borderColor={'light-gray'}
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
                      <Button
                        size="xs"
                        fontSize="1xl"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <BiShow /> : <BiHide />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/*------------------- Form Submit -----------------*/}

            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Registrieren
            </Button>

            <Text>
              Account vorhanden?
              <Button
                type="button"
                variant="link"
                colorScheme="teal"
                fontWeight="extrabold"
                onClick={() => toggleAuthForm()}
              >
                Jetzt anmelden
              </Button>
            </Text>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default singUpForm;
