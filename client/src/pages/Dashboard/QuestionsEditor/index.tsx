import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { Quiz } from '../../../utils/types';
import { useQuizStore } from '../../../stores';
import { Box, SkeletonText, VStack } from '@chakra-ui/react';
import { PageHeader, QuestionEditBar } from '../../../components';

function QuestionsEditor() {
  const { quizId } = useParams();
  const { getQuizById } = useQuizStore();
  const { isLoading, data: quiz } = useFetch<Quiz>(() => getQuizById(Number(quizId)));

  return (
    <Box>
      <PageHeader title="Fragen Editor" description="Ganz nach deinem Wunsch gestaltet" />
      {isLoading ? (
        <SkeletonText
          marginInline="auto"
          noOfLines={7}
          spacing="4"
          skeletonHeight="6rem"
          borderRadius="md"
        />
      ) : (
        <VStack gap="4">
          {quiz?.quizQuestions &&
            quiz?.quizQuestions.map(({ question, quizAnswers }, index) => {
              return (
                <QuestionEditBar
                  question={question}
                  index={index}
                  quizAnswers={quizAnswers}
                />
              );
            })}
        </VStack>
      )}
    </Box>
  );
}

export { QuestionsEditor };
