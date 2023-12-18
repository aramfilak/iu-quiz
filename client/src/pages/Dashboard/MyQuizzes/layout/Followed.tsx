import { Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NoResultFound,
  QuizCard,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../../components';
import { useFetch } from '../../../../hooks';
import { useQuizStore } from '../../../../stores';
import { routes } from '../../../../utils/routes';
import { Quiz } from '../../../../utils/types';

function Followed() {
  const { toggleFollowQuiz, getAllQuizzes } = useQuizStore();
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    isLoading,
    data: followedQuizzes,
    refetchData
  } = useFetch<Quiz[]>(() => getAllQuizzes({ followed: true }));

  const handleUnFlowQuiz = (quizId: number) => {
    setIsSubmitting(true);

    toggleFollowQuiz(quizId)
      .then(() => refetchData())
      .catch(() => toast({ status: 'error', description: 'Entfolgen fehlgeschlagen' }))
      .finally(() => setIsSubmitting(false));
  };

  return isLoading ? (
    <QuizCardSkeleton />
  ) : followedQuizzes?.length ? (
    <QuizCardsGrid>
      {followedQuizzes?.map((quiz) => (
        <QuizCard
          isLoading={isSubmitting}
          key={quiz.id}
          quiz={quiz}
          displayPlayButton
          displayUnFollowButton={{
            onUnFollow: () => handleUnFlowQuiz(quiz.id)
          }}
        />
      ))}
    </QuizCardsGrid>
  ) : (
    <NoResultFound
      title="Kein verfolgtes Quiz"
      description="Sie müssen einem Quiz folgen, um es spielen zu können"
    >
      <Button onClick={() => navigate(`../${routes.Dashboard.children.FindQuiz.path}`)}>
        Jetzt folgen
      </Button>
    </NoResultFound>
  );
}

export { Followed };
