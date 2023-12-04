import { useToast } from '@chakra-ui/react';
import { QuizCard, QuizCardSkeleton, QuizCardsGrid } from '../../../../components';
import { useQuizStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';
import { useFetch } from '../../../../hooks';

function Followed() {
  const { unfollowQuiz, getAllQuizzes } = useQuizStore();
  const toast = useToast();
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
  ) : (
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
  );
}

export { Followed };
