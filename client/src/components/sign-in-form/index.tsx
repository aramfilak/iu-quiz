import './style.scss';
import { Form, Field, Formik, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
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
    .email('Ungültige IU-E-Mail')
    // email must end with @iubh-fernstudium.de or with @iu-study.org
    .matches(/@[iI][uU][bB][hH]-fernstudium\.de$|@iu-study\.org$/i, {
      message: 'Ungültige IU-E-Mail'
    }),
  password: Yup.string().required(isRequiredMessage)
});

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = { email: '', password: '' };

function signInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { toggleAuthForm, signIn } = useAuthStore();

  const handleSubmit = async (
    { email, password }: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    signIn(email, password);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text as="b" fontSize="4xl" color="deep-teal">
              Anmelden
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

            {/*------------------- Form Submit -----------------*/}

            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
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
                onClick={() => toggleAuthForm()}
              >
                Jetzt registrieren
              </Button>
            </Text>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default signInForm;