import {
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  useToast
} from '@chakra-ui/react';

import { BoxWrapper } from '.';
import { QuizQuestion } from '../utils/types';
import { useQuizStore } from '../stores';
import { Field, FieldArray, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';

interface QuestionEditBarProps extends BoxProps {
  questionData: QuizQuestion;
}

function QuestionForm({ questionData, ...rest }: QuestionEditBarProps) {
  const { updateQuizQuestion } = useQuizStore();
  const toast = useToast();

  const handleSubmit = async (
    question: QuizQuestion, // Update parameter type to QuizQuestion
    { setSubmitting }: FormikHelpers<QuizQuestion>
  ) => {
    const response = new Promise((resolve, reject) =>
      updateQuizQuestion(Number(question.id), question)
        .then(() => {
          resolve(true);
        })
        .catch(() => reject())
        .finally(() => setSubmitting(false))
    );
    toast.promise(response, {
      success: { description: 'Frage aktualisiert' },
      error: { description: 'Aktualisierung fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  return (
    <BoxWrapper {...rest}>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={true}
        initialValues={questionData}
      >
        {({ isSubmitting, values }) => (
          <Form style={{ width: 'min(100%,42rem)' }}>
            {<pre>{JSON.stringify(values, null, 2)}</pre>}
            {/*______________________ Question Input ____________________*/}
            <Field name="question">
              {({ field }: FieldProps) => (
                <FormControl isRequired>
                  <FormLabel htmlFor="question">Frage</FormLabel>
                  <InputGroup mb="4">
                    <Input
                      {...field}
                      id="question"
                      name="question"
                      borderColor="teal.500"
                      autoComplete="on"
                      placeholder="Frage..."
                      defaultValue={questionData.question}
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Field>
            {/*______________________   Answers ____________________*/}
            <FieldArray name="quizAnswers">
              {({ remove, push }) => (
                <>
                  {values.quizAnswers.map((answer, index) => (
                    <Flex key={answer.id} alignItems="end" gap="4" mb="2" width="full">
                      <Field name={`quizAnswers.${index}.answer`}>
                        {({ field }: FieldProps) => (
                          <FormControl isRequired={index < 2}>
                            <FormLabel htmlFor={`quizAnswers.${index}.answer`}>
                              Link
                            </FormLabel>
                            <InputGroup>
                              <Input
                                borderColor="teal.500"
                                {...field}
                                name={`quizAnswers.${index}.answer`}
                                id={`quizAnswers.${index}.answer`}
                                defaultValue={answer.answer}
                              />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      {/*______________________  Delete Answer   ____________________*/}
                      <IconButton
                        aria-label="Delete Answer"
                        icon={<FaRegTrashAlt />}
                        colorScheme="red"
                        onClick={() => remove(index)}
                      />
                    </Flex>
                  ))}

                  <IconButton
                    onClick={() =>
                      push({
                        id: Math.round(Math.random() * 10000),
                        answer: '',
                        answerDescription: '',
                        isRightAnswer: false
                      })
                    }
                    aria-label="Frage Löschen"
                    icon={<FaPlus />}
                  />
                </>
              )}
            </FieldArray>

            <Flex justify="end" gap="2" mt="4">
              {/*______________________ Delete Answer Button ____________________*/}
              <Button colorScheme="red">Löschen</Button>
              {/*______________________ Delete Answer Button ____________________*/}
              <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
                Speichern
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </BoxWrapper>
  );
}

export { QuestionForm };
