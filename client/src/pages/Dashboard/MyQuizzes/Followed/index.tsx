import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { QuizCard, QuizCardSkeleton, QuizCardsGrid } from '../../../../components';
import { useQuizStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';

function Followed() {
  const [followedQuizzes, setFollowedQuizzes] = useState<Quiz[]>([]);
  const { isLoading, unfollowQuiz, getAllQuizzes } = useQuizStore();
  const toast = useToast();

  const fetchFollowedQuizzes = async () => {
    const quizzes = await getAllQuizzes({ followed: true });
    setFollowedQuizzes(() => quizzes);
  };

  const handleUnFlowQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) =>
      unfollowQuiz(quizId)
        .then(() => resolve(fetchFollowedQuizzes()))
        .catch(() => reject())
    );

    toast.promise(response, {
      success: { description: 'Folgen entfernt' },
      error: { description: 'Folgen entfernen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  useEffect(() => {
    fetchFollowedQuizzes();
  }, []);

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
