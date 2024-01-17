import { VStack } from '@chakra-ui/react';
import { useGamePlayStore, useQuizStore } from '../../../stores';
import { PlayQuizBody } from './layout/PlayQuizBody';
import { Navigate } from 'react-router-dom';
import { PlayQuizHeader } from './layout/PlayQuizHeader';
import { useEffect } from 'react';
import { shuffleArray } from '../../../utils/helpers';

function GamePlay() {
  const activeQuiz = useQuizStore((state) => state.activeQuiz);
  const setCurrentQuestion = useGamePlayStore((state) => state.setCurrentQuestion);
  const startTimeout = useGamePlayStore((state) => state.startTimeout);

  useEffect(() => {
    if (activeQuiz) {
      const question = activeQuiz.quizQuestions[0];
      question.quizAnswers = shuffleArray(question.quizAnswers);
      setCurrentQuestion(question);
      startTimeout();
    }
  }, []);

  if (!activeQuiz) {
    return <Navigate to=".." />;
  }

  return (
    <VStack gap="8">
      <PlayQuizHeader />
      <PlayQuizBody />
    </VStack>
  );
}

export { GamePlay };
