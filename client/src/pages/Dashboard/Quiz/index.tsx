import { Box, Button } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/shared';
import { PageSkeleton } from '../../../components/skeletons';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';
import { QuizHeader } from './layout';
import { ScoreTable } from '../../../components/shared';

function Quiz() {
  const { quizId } = useParams();
  const { getQuizById } = useQuizStore();
  const { data: quizData, isLoading } = useFetch(() => getQuizById(Number(quizId)));
  const navigate = useNavigate();

  return (
    <Box w="full">
      <PageHeader
        title="Quiz"
        description="Spiel genießen, Feedback geben und Kontakte verknüpfen"
      />
      <Button mb="4" leftIcon={<FaArrowLeft />} onClick={() => navigate(-1)}>
        Zurück
      </Button>
      {isLoading || !quizData ? (
        <PageSkeleton />
      ) : (
        <QuizHeader
          updatedAt={quizData?.updatedAt}
          title={quizData?.title}
          course={quizData?.course}
          courseOfStudy={quizData?.courseOfStudy}
          size={quizData?.size}
          popularity={quizData?.popularity}
          authorId={quizData?.authorId}
          isLoading={isLoading}
        />
      )}
      {isLoading || !quizData ? (
        <PageSkeleton />
      ) : (
        <ScoreTable scoreTableData={quizData.scors} quizData={quizData} />
      )}
    </Box>
  );
}

export { Quiz };
