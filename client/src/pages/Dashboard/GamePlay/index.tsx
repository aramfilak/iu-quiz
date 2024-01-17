import { VStack } from '@chakra-ui/react';
import { useGamePlayStore, useQuizStore } from '../../../stores';
import { PlayQuizBody } from './layout/PlayQuizBody';
import { Navigate } from 'react-router-dom';
import { PlayQuizHeader } from './layout/PlayQuizHeader';
import { useEffect } from 'react';

function GamePlay() {
  const activeQuiz = useQuizStore((state) => state.activeQuiz);
  const setCurrentQuestion = useGamePlayStore((state) => state.setCurrentQuestion);
  const startTimeout = useGamePlayStore((state) => state.startTimeout);

  useEffect(() => {
    if (activeQuiz) {
      setCurrentQuestion(activeQuiz.quizQuestions[0]);
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
