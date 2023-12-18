import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GoBackButton, PageHeader } from '../../../components/shared';
import { PageSkeleton } from '../../../components/skeletons';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';
import { Feedbacks, QuizHeader, ScoreTable } from './layout';

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
          <Grid
            gap="4"
            display={{ base: 'block', lg: 'grid' }}
            gridTemplateColumns="repeat(6,1fr)"
          >
            <GridItem colSpan={4}>
              <QuizHeader quiz={quizData} onChange={refetchData} />
            </GridItem>
            <GridItem mt={{ base: '4', lg: '0' }} colSpan={2}>
              <Feedbacks feedbacks={quizData.feedbacks} h="402.2px" overflow="hidden" />
            </GridItem>
          </Grid>
          <ScoreTable scores={quizData.scores} />
        </>
      )}
    </Box>
  );
}

export { Quiz };
