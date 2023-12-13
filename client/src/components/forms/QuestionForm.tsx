import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Tooltip,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { Field, FieldArray, FieldProps, Form, Formik } from 'formik';
import { useState } from 'react';
import { FaPlus, FaRegTrashAlt, FaSave, FaSync, FaTrashAlt } from 'react-icons/fa';
import { useQuizStore } from '../../stores';
import { ActionType } from '../../utils/enums';
import { QuestionData } from '../../utils/types';
import { CustomAlertDialog } from '../dialogs';
import { BoxWrapper } from '../shared';

interface QuestionEditBarProps extends BoxProps {
  onSubmit: () => void;
  actionType: ActionType;
  questionData: QuestionData;
}

function QuestionForm({
  actionType,
  questionData,
  onSubmit,
  ...rest
}: QuestionEditBarProps) {
  const { createQuizQuestion, updateQuizQuestion, deleteQuizQuestion } = useQuizStore();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (question: QuestionData) => {
    setIsLoading(true);

    if (actionType === ActionType.CREATE) {
      createQuizQuestion(question)
        .then(() => toast({ status: 'success', description: 'Frage erstellt' }))
        .catch(() => toast({ status: 'error', description: 'Erstellung fehlgeschlagen' }))
        .finally(() => {
          setIsLoading(false);
          onSubmit();
        });
    } else if (actionType === ActionType.UPDATE) {
      updateQuizQuestion(Number(question.id), question)
        .then(() => toast({ status: 'success', description: 'Frage aktualisiert' }))
        .catch(() =>
          toast({ status: 'error', description: 'Aktualisierung fehlgeschlagen' })
        )
        .finally(() => {
          setIsLoading(false);
          onSubmit();
        });
    }
  };

  const handleDeleteQuestion = () => {
    setIsLoading(true);

    const response = new Promise((resolve, reject) =>
      deleteQuizQuestion(Number(questionData.id), Number(questionData.quizId))
        .then(() => {
          resolve(true);
        })
        .catch(() => reject())
        .finally(() => {
          setIsLoading(false);
          onSubmit();
        })
    );

    toast.promise(response, {
      success: { description: 'Frage gelöscht' },
      error: { description: 'Löschen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  return (
    <Box {...rest}>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleDeleteQuestion}
        title="Frage löschen"
        description="Sind Sie sicher, dass Sie diese Frage löschen möchten? Dies kann nicht wiederhergestellt werden!"
        submitButtonLabel="Löschen"
      />
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={true}
        initialValues={questionData}
      >
        {({ values, handleReset }) => (
          <Form style={{ width: '100%', marginInline: 'auto' }}>
            <BoxWrapper mb="4" shadow="base">
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
                        defaultValue={questionData.question || ''}
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
            </BoxWrapper>
            {/*______________________   Answers ____________________*/}
            <FieldArray name="quizAnswers">
              {({ remove, push }) => (
                <>
                  {values.quizAnswers.map((answer, index) => (
                    <BoxWrapper mb="4" shadow="base" key={answer.id}>
                      <Flex alignItems="end" gap="1" mb="2" width="full">
                        {/*______________________   Answer ____________________*/}
                        <Field name={`quizAnswers.${index}.answer`}>
                          {({ field }: FieldProps) => (
                            <FormControl isRequired>
                              <FormLabel htmlFor={`quizAnswers.${index}.answer`}>
                                Antwort {index + 1}
                              </FormLabel>
                              <InputGroup>
                                <Input
                                  {...field}
                                  borderColor="teal.500"
                                  name={`quizAnswers.${index}.answer`}
                                  id={`quizAnswers.${index}.answer`}
                                  defaultValue={answer.answer || ''}
                                />
                              </InputGroup>
                            </FormControl>
                          )}
                        </Field>
                        {/*______________________  Delete Answer   ____________________*/}
                        {values.quizAnswers.length > 2 && (
                          <Tooltip label="Eingabefeld löschen">
                            <IconButton
                              aria-label="Antwort Löschen"
                              icon={<FaRegTrashAlt />}
                              colorScheme="red"
                              onClick={() => remove(index)}
                            />
                          </Tooltip>
                        )}

                        {/*______________________  Add Answer   ____________________*/}
                        {values.quizAnswers.length < 4 && (
                          <Tooltip label="Eingabefeld hinzufügen">
                            <IconButton
                              aria-label="Neuer Antwort"
                              icon={<FaPlus />}
                              onClick={() =>
                                push({
                                  answer: '',
                                  answerDescription: '',
                                  isRightAnswer: false
                                })
                              }
                            />
                          </Tooltip>
                        )}
                      </Flex>

                      {/*______________________   Answer ____________________*/}
                      <Field name={`quizAnswers.${index}.answerDescription`}>
                        {({ field }: FieldProps) => (
                          <FormControl>
                            <FormLabel htmlFor={`quizAnswers.${index}.answerDescription`}>
                              Beschreibung
                            </FormLabel>
                            <InputGroup>
                              <Input
                                {...field}
                                borderColor="teal.500"
                                name={`quizAnswers.${index}.answerDescription`}
                                id={`quizAnswers.${index}.answerDescription`}
                                defaultValue={answer.answerDescription || ''}
                                placeholder="Antwortbeschreibung, wenn ausgewählt"
                              />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      {/*______________________  Is Right Answer   ____________________*/}
                      <Field name={`quizAnswers.${index}.isRightAnswer`}>
                        {({ field }: FieldProps) => (
                          <FormControl display="flex" alignItems="center">
                            <InputGroup>
                              <FormLabel
                                htmlFor={`quizAnswers.${index}.isRightAnswer`}
                                mr="2"
                              >
                                Ist Richtige Antwort?
                              </FormLabel>
                              <Checkbox
                                size="lg"
                                borderColor="teal"
                                colorScheme="teal"
                                {...field}
                                defaultChecked={answer.isRightAnswer}
                                name={`quizAnswers.${index}.isRightAnswer`}
                                id={`quizAnswers.${index}.isRightAnswer`}
                              />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                    </BoxWrapper>
                  ))}
                </>
              )}
            </FieldArray>
            <Flex
              mb="4"
              borderRadius="md"
              justifyContent="end"
              gap={{ base: '4', md: '2' }}
              mt="10"
              flexDir={{ base: 'column-reverse', md: 'row' }}
            >
              <Button
                type="button"
                onClick={handleReset}
                colorScheme="blue"
                leftIcon={<FaSync />}
              >
                Zurücksetzen
              </Button>
              {/*______________________ Delete Answer Button ____________________*/}

              {actionType === ActionType.UPDATE && (
                <Button
                  colorScheme="red"
                  type="button"
                  isLoading={isLoading}
                  onClick={onOpen}
                  leftIcon={<FaTrashAlt />}
                >
                  Löschen
                </Button>
              )}
              {/*______________________ Delete Answer Button ____________________*/}

              <Button
                type="submit"
                gap="2"
                isLoading={isLoading}
                leftIcon={actionType === ActionType.CREATE ? <FaPlus /> : <FaSave />}
              >
                {actionType === ActionType.CREATE ? 'Erstellen' : 'Speichern'}
              </Button>
              {/*______________________ Delete Answer Button ____________________*/}
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export { QuestionForm };
