import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  List,
  ListIcon,
  ListItem,
  Text
} from '@chakra-ui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { BoxWrapper } from '.';
import { FaCheckSquare, FaQuestion } from 'react-icons/fa';
import { FaSquareXmark } from 'react-icons/fa6';
import { QuizAnswer } from '../utils/types';
// import { useQuizStore } from '../stores';
interface QuestionEditBarProps extends BoxProps {
  question: string;
  index: number;
  quizAnswers: QuizAnswer[];
}

function QuestionEditBar({
  question,
  quizAnswers,
  index,
  ...rest
}: QuestionEditBarProps) {
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
      <Text fontWeight="bold"> #{index + 1}</Text>
      <Accordion width="full" allowToggle>
        {/*______________________ Question ____________________*/}
        <AccordionItem>
          <h2>
            <AccordionButton bg="gray.100">
              <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                {question}
              </Box>

              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb="4" bg="white">
            {/*______________________ Edit Question ____________________*/}
            <Flex gap="4">
              <InputGroup>
                <InputLeftAddon>
                  <FaQuestion />
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
              <Button>Speichern</Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        {/*______________________ Answers ____________________*/}
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton bg="gray.100">
                  <Box as="span" flex="1" textAlign="left">
                    {quizAnswers.length} Antworten
                  </Box>
                  {isExpanded ? <FiMinus /> : <FiPlus />}
                </AccordionButton>
              </h2>
              <AccordionPanel pb="4" bg="white">
                <List spacing="3" mb="10">
                  {quizAnswers.map(({ answer, isRightAnswer }) => (
                    <ListItem
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      p="3"
                    >
                      <ListIcon
                        fontSize="xl"
                        as={isRightAnswer ? FaCheckSquare : FaSquareXmark}
                        color={isRightAnswer ? 'green.500' : 'red.500'}
                      />
                      {answer}
                    </ListItem>
                  ))}
                </List>
                <Flex justify="end" gap="2">
                  {/*______________________ Delete Answer Button ____________________*/}
                  <Button colorScheme="red">Löschen</Button>
                  {/*______________________ Delete Answer Button ____________________*/}
                  <Button>Bearbeiten</Button>
                </Flex>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </BoxWrapper>
  );
}

export { QuestionEditBar };
