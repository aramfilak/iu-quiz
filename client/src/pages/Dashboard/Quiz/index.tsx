import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GoBackButton, PageHeader } from '../../../components/shared';
import { PageSkeleton } from '../../../components/skeletons';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';
import { QuizHeader, ScoreTable } from './layout';

function Quiz() {
  const { quizId } = useParams();
  const { getQuizById } = useQuizStore();
  const {
    data: quizData,
    isLoading,
    refetchData
  } = useFetch(() => getQuizById(Number(quizId)));

  return (
    <Box w="full">
      <PageHeader
        title="Quiz"
        description="Spiel genießen, Feedback geben und Kontakte verknüpfen"
      />
      <GoBackButton />
      {isLoading || !quizData ? (
        <PageSkeleton />
      ) : (
        <>
          <QuizHeader quiz={quizData} onChange={refetchData} />
          <ScoreTable scores={quizData.scores} />
        </>
      )}
    </Box>
  );
}

export { Quiz };
