import {
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Text,
  VStack
} from '@chakra-ui/react';
import { useGamePlayStore, useQuizStore } from '../../../../stores';
import { convertSecondsToMin } from '../../../../utils/formatters';
import './style.css';
import { resultShades } from '../../../../utils/helpers';

function ResultPanel() {
  const timeTaken = useGamePlayStore((state) => state.takenTime);
  const numberOfCorrectAnswers = useGamePlayStore((state) => state.correctAnswers);
  const activeQuiz = useQuizStore((state) => state.activeQuiz);
  const accuracy = (numberOfCorrectAnswers / activeQuiz!.size) * 100;
  const oneMinProgress = ((timeTaken % 60) / 60) * 100;

  return (
    <Flex
      w="full"
      justify="space-evenly"
      align="center"
      p="4"
      bg="gray.100"
      _dark={{ bg: 'gray.600' }}
      borderRadius="md"
    >
      {/*_______________ timeTaken __________________*/}
      <VStack h="full" justifyContent="space-between">
        <CircularProgress
          value={oneMinProgress}
          fontWeight="500"
          color="blue.400"
          size="100px"
        >
          <CircularProgressLabel fontSize="sm">
            {`${convertSecondsToMin(timeTaken)}`}
          </CircularProgressLabel>
        </CircularProgress>
        <Text fontWeight="bold">Dauer</Text>
      </VStack>
      {/*_______________ Accuracy __________________*/}
      <VStack>
        <CircularProgress
          color={resultShades(accuracy)}
          value={accuracy}
          fontWeight="500"
          size="100px"
        >
          <CircularProgressLabel fontSize="xl">
            {' '}
            {accuracy.toFixed(2)}%
          </CircularProgressLabel>
        </CircularProgress>
        <Text fontWeight="bold">Genauigkeit</Text>
      </VStack>
    </Flex>
  );
}

export { ResultPanel };
