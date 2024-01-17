import { Box, BoxProps, Flex, Text } from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import { useGamePlayStore } from '../../../../stores';

interface AnswerProps extends BoxProps {
  answer: string;
  isSelected: boolean;
  isAnswered: boolean;
  isRightAnswer: boolean;
}

function Answer({ answer, isAnswered, isRightAnswer, isSelected, ...rest }: AnswerProps) {
  const incrementNumberOfCorrectAnswers = useGamePlayStore(
    (state) => state.incrementNumberOfCorrectAnswers
  );
  const isCorrectAnswer = isSelected && isRightAnswer;

  useEffect(() => {
    if (isSelected && isRightAnswer) {
      incrementNumberOfCorrectAnswers();
    }
  }, [isSelected, isRightAnswer]);

  return (
    <Box
      {...rest}
      paddingInline="4"
      paddingBlock="8"
      borderRadius="md"
      cursor={isAnswered ? 'not-allowed' : 'pointer'}
      transition="all 0.2s ease-in-out"
      border="2px solid"
      borderColor={isAnswered ? (isRightAnswer ? 'green.500' : 'red.500') : 'gray.300'}
      _hover={{ borderColor: isAnswered ? ' ' : 'teal.500' }}
    >
      {isSelected ? (
        <Flex
          justify="space-between"
          fontSize="2xl"
          color={isCorrectAnswer ? 'green.500' : 'red.500'}
        >
          <Text>{answer}</Text>
          {isCorrectAnswer ? <FaCheck /> : <FaTimes />}
        </Flex>
      ) : (
        <Text>{answer}</Text>
      )}
    </Box>
  );
}

export { Answer };
