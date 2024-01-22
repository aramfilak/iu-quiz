import { Alert, AlertIcon, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BoxWrapper } from '../../../../components';
import { useGamePlayStore, useQuizStore } from '../../../../stores';
import { Answer } from './Answer';
import './style.css';
import { FaArrowRight } from 'react-icons/fa';
import { ResultPanel } from './ResultPanel';
import { useNavigate } from 'react-router-dom';

function PlayQuizBody() {
  const activeQuiz = useQuizStore((state) => state.activeQuiz);
  const updateQuizScores = useQuizStore((state) => state.updateQuizScores);
  const [checkedAnswerIndex, setCheckedAnswerIndex] = useState(-1);
  const [isAnswered, setIsAnswered] = useState(false);
  const {
    currentQuestion,
    currentQuestionIndex,
    gameIsFinished,
    handleNavigation,
    setGameIsFinished,
    stopTimeout,
    correctAnswers,
    takenTime,
    resetStore
  } = useGamePlayStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeQuiz && currentQuestionIndex === activeQuiz?.size - 1 && isAnswered) {
      stopTimeout();
      setGameIsFinished(true);
    }
  }, [isAnswered]);

  useEffect(() => {
    if (activeQuiz && gameIsFinished) {
      updateQuizScores(activeQuiz.id, takenTime, correctAnswers, activeQuiz.size).finally(
        () => {
          resetStore();
          navigate(-1);
        }
      );
    }
  }, [gameIsFinished]);

  if (!activeQuiz || !currentQuestion) return null;

  return (
    <BoxWrapper w="full" pos="relative">
      {/*_______________ Result Panel __________________*/}
      <ResultPanel />

      {/*_______________ Question __________________*/}
      <Text fontWeight="bold" fontSize="xl" mb="10">
        {currentQuestion.question}
      </Text>

      {isAnswered &&
        currentQuestion.quizAnswers[checkedAnswerIndex].answerDescription && (
          <Alert
            maxW="98.8%"
            className="answer-description"
            status={
              currentQuestion.quizAnswers[checkedAnswerIndex].isRightAnswer
                ? 'success'
                : 'error'
            }
          >
            <AlertIcon />
            {`Beschreibung: ${currentQuestion.quizAnswers[checkedAnswerIndex].answerDescription}`}
          </Alert>
        )}

      <Flex flexWrap="wrap" w="100%" gap="0.8rem">
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
        isDisabled={!isAnswered || gameIsFinished}
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
