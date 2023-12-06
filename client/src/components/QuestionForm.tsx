import {
  BoxProps,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Text
} from '@chakra-ui/react';

import { BoxWrapper } from '.';
import { FaQuestion, FaRegQuestionCircle, FaRegTrashAlt } from 'react-icons/fa';

import { QuizQuestion } from '../utils/types';
import { Fragment } from 'react';
// import { useQuizStore } from '../stores';
interface QuestionEditBarProps extends BoxProps {
  questionData: QuizQuestion;
}

function QuestionForm({ questionData, ...rest }: QuestionEditBarProps) {
  const { question, quizAnswers } = questionData;

  // const { updateQuizQuestion } = useQuizStore();

  // const handleUpdateQuestion = (quizId: number, answer: []) => {
  //   const response = new Promise((resolve, reject) =>
  //     updateQuizQuestion(quizId, [])
  //       .then(() => {
  //         resolve(true);
  //       })
  //       .catch(() => reject())
  //   );

  //   toast.promise(response, {
  //     success: { description: 'Neues Quiz erstellt' },
  //     error: { description: 'Erstellung fehlgeschlagen' },
  //     loading: { description: 'Es lädt..' }
  //   });
  // };

  return (
    <BoxWrapper width="full" {...rest}>
      <form>
        {/*______________________ Question Input ____________________*/}
        <InputGroup mb="4">
          <InputLeftAddon fontWeight="Bold">
            <FaRegQuestionCircle />
            <Text ml="2">Frage</Text>
          </InputLeftAddon>
          <Input
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            borderColor="teal.500"
            autoComplete="on"
            placeholder="Frage..."
            defaultValue={question}
          />
        </InputGroup>

        {quizAnswers.map(({ id, answer, isRightAnswer }) => (
          <Fragment key={id}>
            <Flex>
              {/*______________________ Is Right Answer   ____________________*/}
              <Checkbox colorScheme="green" defaultChecked={isRightAnswer}>
                Richtige Antwort
              </Checkbox>
              {/*______________________  Answer   ____________________*/}
              <InputGroup>
                <InputLeftAddon>
                  <FaQuestion></FaQuestion>
                </InputLeftAddon>
                <Input
                  flex="1"
                  borderColor="teal.500"
                  autoComplete="on"
                  placeholder="Antwort..."
                  defaultValue={answer}
                />
                {/*______________________  Delete Answer   ____________________*/}
                <IconButton
                  aria-label="Delete Answer"
                  icon={<FaRegTrashAlt />}
                  colorScheme="red"
                />
              </InputGroup>
            </Flex>
            <InputGroup>
              <InputLeftAddon>
                <FaQuestion></FaQuestion>
              </InputLeftAddon>
              <Input
                flex="1"
                borderColor="teal.500"
                autoComplete="on"
                placeholder="Antwort..."
                defaultValue={answer}
              />
            </InputGroup>
          </Fragment>
        ))}

        <Flex justify="end" gap="2" mt="4">
          {/*______________________ Delete Answer Button ____________________*/}
          <Button colorScheme="red">Löschen</Button>
          {/*______________________ Delete Answer Button ____________________*/}
          <Button>Änderungen Speichern</Button>
        </Flex>
      </form>
    </BoxWrapper>
  );
}

export { QuestionForm };
