import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GoBackButton, PageHeader, PageSkeleton } from '../../../components';
import { Feedbacks } from '../../../components/Feedbacks';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';
import { QuizPanel, ScoreTable } from './layout';
import { useEffect } from 'react';

function Quiz() {
  const { quizId } = useParams();
  const getQuizById = useQuizStore((state) => state.getQuizById);
  const { data: quiz, refetchData } = useFetch(() => getQuizById(Number(quizId)));
  const setActiveQuiz = useQuizStore((state) => state.setActiveQuiz);

  useEffect(() => {
    if (quiz) {
      setActiveQuiz(quiz);
    }
  }, [quiz]);

  return (
    <Box w="full">
      <PageHeader
        title="Quiz"
        description="Spiel genießen. Feedback geben. Kontakte knüpfen."
      />
      <GoBackButton />
      {!quiz ? (
        <PageSkeleton />
      ) : (
        <>
          <Flex gap="4" flexDir={{ base: 'column', lg: 'row' }}>
            <QuizPanel onChange={refetchData} flex="1" />
            <Feedbacks
              w={{ lg: '30rem' }}
              quizId={quiz.id}
              feedbacks={quiz.feedbacks}
              overflow="hidden"
              onChange={refetchData}
            />
          </Flex>
          <ScoreTable scores={quiz.scores} />
        </>
      )}
    </Box>
  );
}

export { Quiz };
