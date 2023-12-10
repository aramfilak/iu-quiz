import { Button, useToast } from '@chakra-ui/react';
import { QuizCard, QuizCardsGrid } from '../../../../components/quiz-card';
import { QuizCardSkeleton } from '../../../../components/skeletons';
import { NoResultFound } from '../../../../components/shared';
import { useQuizStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';
import { useFetch } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../utils/routes';
import { useState } from 'react';

function Followed() {
  const { unfollowQuiz, getAllQuizzes } = useQuizStore();
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

    unfollowQuiz(quizId)
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
