import { Button, useToast } from '@chakra-ui/react';
import {
  NoResultFound,
  QuizCard,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../../components';
import { useQuizStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';
import { useFetch } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../utils/routes';

function Followed() {
  const { unfollowQuiz, getAllQuizzes } = useQuizStore();
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isLoading,
    data: followedQuizzes,
    refetchData
  } = useFetch<Quiz[]>(() => getAllQuizzes({ followed: true }));

  const handleUnFlowQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) =>
      unfollowQuiz(quizId)
        .then(() => resolve(refetchData()))
        .catch(() => reject())
    );

    toast.promise(response, {
      success: { description: 'Folgen entfernt' },
      error: { description: 'Folgen entfernen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  return isLoading ? (
    <QuizCardSkeleton />
  ) : followedQuizzes?.length ? (
    <QuizCardsGrid>
      {followedQuizzes?.map((quiz) => (
        <QuizCard
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
