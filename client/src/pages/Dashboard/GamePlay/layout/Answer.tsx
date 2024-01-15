import { Box, BoxProps, Text } from '@chakra-ui/react';
import { IconBox } from '../../../../components';
import { FaCheckCircle } from 'react-icons/fa';
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

  useEffect(() => {
    if (isSelected) {
      incrementNumberOfCorrectAnswers();
    }
  }, []);

  return (
    <Box
      {...rest}
      paddingInline="4"
      paddingBlock="8"
      borderRadius="md"
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      border="2px solid"
      borderColor={isAnswered ? (isRightAnswer ? 'green.500' : 'red.500') : 'gray.300'}
      backgroundColor={isAnswered ? (isRightAnswer ? 'green.100' : 'red.100') : 'white'}
      _hover={{
        borderColor: 'teal.500'
      }}
    >
      {isSelected ? (
        <IconBox rightIcon={<FaCheckCircle />}>{answer}</IconBox>
      ) : (
        <Text>{answer} </Text>
      )}
    </Box>
  );
}

export { Answer };
