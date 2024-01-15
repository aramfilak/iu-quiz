import { VStack } from '@chakra-ui/react';
import { PlayQuizBody } from './PlayQuizBody';
import { useGamePlayStore, useQuizStore } from '../../../stores';

import { Navigate } from 'react-router-dom';
import { PlayQuizHeader } from './PlayQuizHeader';
import { PlayQuizFooter } from './PlayQuizFooter';

function GamePlay() {
  const currentQuestionIndex = useGamePlayStore((state) => state.currentQuestionIndex);

  const activeQuiz = useQuizStore((state) => state.activeQuiz);

  if (!activeQuiz) {
    return <Navigate to=".." />;
  }

  return (
    <VStack gap="4">
      <PlayQuizHeader />
      <PlayQuizBody quizQuestions={activeQuiz.quizQuestions[currentQuestionIndex]} />
      <PlayQuizFooter />
    </VStack>
  );
}

export { GamePlay };
