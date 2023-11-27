import {
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  Tooltip,
  VStack,
  Checkbox,
  IconButton,
  Box,
  Button,
  Alert,
  AlertIcon,
  Flex
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuizStore } from '../../../../stores';
import { FaQuestionCircle, FaStar, FaPlus, FaTrash } from 'react-icons/fa';
import { BoxWrapper, PageHeader } from '../../../../components';
import { QuizAnswer } from '../../../../utils/types';
import { CustomAlert } from '../../../../utils/types';

function QuizEditor() {
  const { createQuizQuestion } = useQuizStore();
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const [isBooleanQuestion, setIsBooleanQuestion] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);

  const [question, setQuestion] = useState('');
  const [reasons, setReasons] = useState(['', '', '', '']);
  const [answers, setAnswers] = useState(['', '', '', '']);

  const handleAddAnswer = () => {
    if (answers.length < 4) {
      setAnswers([...answers, '']); // Fügt eine leere Antwort hinzu
    }
  };

  const handleCheckboxChange = (index: number) => {
    if (correctAnswerIndex === index) {
      setCorrectAnswerIndex(null);
    } else {
      setCorrectAnswerIndex(index);
    }
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const quizId = 19;
    const currentQuestion = question;
    const currentAnswers: QuizAnswer[] = answers.map((answer, index) => ({
      answer: answer,
      isRightAnswer: index === correctAnswerIndex,
      answerDescription: reasons[index]
    })) as QuizAnswer[];

    const { success, message } = await createQuizQuestion({
      quizId,
      question: currentQuestion,
      answers: currentAnswers
    });

    setAlert({ status: success ? 'success' : 'error', message: message });
  };

  return (
    <>
      {/*------------------- Alert  --------------------*/}
      {alert && (
        <Alert status={alert.status} mb="4">
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
      <PageHeader title={'Editor'} description="Erstelle dein eigenes Quiz" />
      <BoxWrapper>
        <Flex flexDir={'row'} width="100%">
          {/*------------------- Question --------------------*/}
          <InputGroup w="100%">
            <Tooltip label="Frage">
              <InputLeftAddon>
                <FaQuestionCircle />
              </InputLeftAddon>
            </Tooltip>
            <Input
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              borderColor="teal.500"
              autoComplete="on"
              placeholder="Frage"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <InputRightAddon>
              <Checkbox
                isChecked={isBooleanQuestion}
                onChange={(e) => setIsBooleanQuestion(e.target.checked)}
              >
                Boolean Frage?
              </Checkbox>
            </InputRightAddon>
          </InputGroup>
        </Flex>
        <Flex flexDir={'row'} width="100%">
          {/*------------------- Answers --------------------*/}
          <VStack align="start" spacing="1rem" w="100%">
            {answers.map((answer, index) => (
              <Flex key={index} w="100%" align="start" direction="column">
                <InputGroup>
                  <Tooltip label="Antwort">
                    <InputLeftAddon>
                      <FaStar />
                    </InputLeftAddon>
                  </Tooltip>
                  <Input
                    mr="10px"
                    borderTopLeftRadius="0"
                    borderBottomLeftRadius="0"
                    borderColor="teal.500"
                    autoComplete="on"
                    placeholder={`Antwort ${index + 1}`}
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  />
                  <Flex align="center" gap="0.5rem">
                    {index === answers.length - 1 && answers.length < 4 && (
                      <IconButton
                        icon={<FaPlus />}
                        fontSize="16"
                        size="sm"
                        aria-label="Weitere Antwort hinzufügen"
                        onClick={handleAddAnswer}
                      />
                    )}
                    {answers.length > 1 && (
                      <IconButton
                        icon={<FaTrash />}
                        fontSize="16"
                        size="sm"
                        colorScheme="red"
                        aria-label="Antwort entfernen"
                        onClick={() => handleRemoveAnswer(index)}
                      />
                    )}
                  </Flex>
                </InputGroup>
                <InputGroup w="100%">
                  <Input
                    ml="50px"
                    mt="5px"
                    borderTopLeftRadius="0"
                    borderBottomLeftRadius="0"
                    borderColor="teal.500"
                    autoComplete="on"
                    placeholder="Begründung"
                    value={reasons[index]}
                    onChange={(e) => {
                      const newReasons = [...reasons];
                      newReasons[index] = e.target.value;
                      setReasons(newReasons);
                    }}
                  />
                </InputGroup>
                <Box ml="50px" mt="5px" display="flex" alignItems="center">
                  <span>Richtige Antwort? </span>
                  <Checkbox
                    ml="5px"
                    isChecked={correctAnswerIndex === index}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </Box>
              </Flex>
            ))}
          </VStack>
        </Flex>
        <Flex justify="space-between" width="100%" mt="2rem">
          <Button colorScheme="teal" variant="outline">
            Zurück
          </Button>
          <Flex gap="0.5rem">
            <Button colorScheme="teal">Weiter</Button>
            <form onSubmit={handleSubmit}>
              <Button type="submit" colorScheme="teal">
                Speichern
              </Button>
            </form>
          </Flex>
        </Flex>
      </BoxWrapper>
    </>
  );
}

export { QuizEditor };
