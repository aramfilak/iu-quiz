import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BoxWrapper } from '../../../../components';
import { useGamePlayStore, useQuizStore } from '../../../../stores';
import { Answer } from './Answer';
import './style.css';
import { FaArrowRight } from 'react-icons/fa';

function PlayQuizBody() {
  const activeQuiz = useQuizStore((state) => state.activeQuiz);
  const currentQuestion = useGamePlayStore((state) => state.currentQuestion);
  const intervalId = useGamePlayStore((state) => state.intervalId);
  const handleNavigation = useGamePlayStore((state) => state.handleNavigation);
  const startTimeout = useGamePlayStore((state) => state.startTimeout);
  const [checkedAnswerIndex, setCheckedAnswerIndex] = useState(-1);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!activeQuiz || !currentQuestion) return null;

  return (
    <BoxWrapper w="full" pos="relative">
      {/*_______________ Overlay __________________*/}
      <Flex
        justify="center"
        align="center"
        w="full"
        h="full"
        top="0"
        left="0"
        pos="absolute"
        className={intervalId ? 'remove-blur' : 'add-blur'}
      >
        <Button onClick={() => startTimeout()}>Spiel starten</Button>
      </Flex>

      {/*_______________ Question __________________*/}
      <Text fontWeight="bold" fontSize="xl" mb="10">
        {currentQuestion.question}
      </Text>

      <Flex flexWrap="wrap" w="full" gap="0.8rem">
        {/*_______________ Answers __________________*/}
        {currentQuestion.quizAnswers.map((answer, index) => {
          return (
            <Answer
              onClick={() => {
                if (!isAnswered) {
                  setCheckedAnswerIndex(index);
                  setIsAnswered(true);
                }
              }}
              isSelected={index === checkedAnswerIndex}
              isAnswered={isAnswered}
              w={{ base: 'full', lg: 'calc(50% - 0.8rem)' }}
              key={answer.id}
              answer={answer.answer}
              isRightAnswer={answer.isRightAnswer}
            />
          );
        })}
      </Flex>
      {/*_________________________ Previous Button _____________________*/}

      <Button
        ml="auto"
        mt="4"
        leftIcon={<FaArrowRight />}
        colorScheme="blue"
        isDisabled={!isAnswered}
        onClick={() => {
          if (isAnswered) {
            handleNavigation(activeQuiz.size);
            setIsAnswered(false);
            setCheckedAnswerIndex(-1);
          }
        }}
      >
        Nächste
      </Button>
    </BoxWrapper>
  );
}

export { PlayQuizBody };
