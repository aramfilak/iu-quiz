import { Button, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NoQuizzes, QuizCard, QuizCardSkeleton, QuizCardsGrid } from '../../../../components';
import { useQuizStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../utils/routes';

function Followed() {
  const [followedQuizzes, setFollowedQuizzes] = useState<Quiz[]>([]);
  const { isLoading, unfollowQuiz, getFollowedQuizzes } = useQuizStore();
  const toast = useToast();
  const navigate = useNavigate();

  const fetchFollowedQuizzes = async () => {
    const quizzes = await getFollowedQuizzes();
    setFollowedQuizzes(() => quizzes);
  };

  useEffect(() => {
    fetchFollowedQuizzes();
  }, []);

  const handleUnFlowQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) => {
      unfollowQuiz(quizId).then(({ success }) => {
        if (success) {
          resolve(fetchFollowedQuizzes());
        } else {
          reject();
        }
      });
    });

    toast.promise(response, {
      success: { description: 'Folgen entfernt' },
      error: { description: 'Folgen entfernen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  return isLoading ? (
    <QuizCardSkeleton />
  ) : (
    <>
      <QuizCardsGrid>
        {followedQuizzes.length > 0 &&
          followedQuizzes?.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              displayPlayButton
              displayFollowButton={{
                isFollowed: true,
                onFollow: () => {},
                onUnfollow: () => handleUnFlowQuiz(quiz.id)
              }}
            />
          ))}
      </QuizCardsGrid>
      {followedQuizzes.length < 1 && (
        <NoQuizzes
          mt="20"
          title="Noch kein verfolgtes Quiz?"
          description="Sie müssen dem Quiz folgen, um das Quiz spielen zu können"
        >
          <Button onClick={() => navigate(`../${routes.Dashboard.children.SearchQuiz.path}`)}>
            Quiz Finden
          </Button>
        </NoQuizzes>
      )}
    </>
  );
}

export { Followed };
