import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GoBackButton, PageHeader, PageSkeleton } from '../../../components';
import { Feedbacks } from '../../../components/Feedbacks';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';
import { QuizHeader, ScoreTable } from './layout';

function Quiz() {
  const { quizId } = useParams();
  const getQuizById = useQuizStore((state) => state.getQuizById);
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
          <Flex gap="4" flexDir={{ base: 'column', lg: 'row' }}>
            <QuizHeader quiz={quizData} onChange={refetchData} flex="1" />
            <Feedbacks
              w={{ lg: '30rem' }}
              quizId={quizData.id}
              feedbacks={quizData.feedbacks}
              overflow="hidden"
              onChange={refetchData}
            />
          </Flex>
          <ScoreTable scores={quizData.scores} />
        </>
      )}
    </Box>
  );
}

export { Quiz };
