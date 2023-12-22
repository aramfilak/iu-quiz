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
import { QuizQueryParams } from '../../../../utils/types';
import Pagination from '../../../../components/Pagination';

function Followed() {
  const { toggleFollowQuiz, getAllQuizzes } = useQuizStore();
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [params, setParams] = useState<QuizQueryParams>({
    page: '1',
    followed: true
  });
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const {
    isLoading,
    data: { quizzes: followedQuizzes = [], totalPages = 1 } = {},
    refetchData
  } = useFetch(() => getAllQuizzes(params));

  const handleUnFlowQuiz = (quizId: number) => {
    setIsSubmitting(true);

    toggleFollowQuiz(quizId)
      .then(() => refetchData())
      .catch(() => toast({ status: 'error', description: 'Entfolgen fehlgeschlagen' }))
      .finally(() => setIsSubmitting(false));
  };

  const handlePreviousPage = () => {
    setCurrentPageIndex((prevPage) => prevPage - 1);

    setParams((prevParams) => ({
      ...prevParams,
      page: (currentPageIndex - 1).toString()
    }));

    refetchData();
  };

  const handleNextPage = () => {
    setCurrentPageIndex((prevPage) => prevPage + 1);

    setParams((prevParams) => ({
      ...prevParams,
      page: (currentPageIndex + 1).toString()
    }));

    refetchData();
  };

  const handlePageClick = (pageNumbers: number) => {
    setCurrentPageIndex(pageNumbers);

    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumbers.toString()
    }));

    refetchData();
  };

  return (
    <>
      {isLoading ? (
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
          <Button
            onClick={() => navigate(`../${routes.Dashboard.children.FindQuiz.path}`)}
          >
            Jetzt folgen
          </Button>
        </NoResultFound>
      )}

      {totalPages > 0 && (
        <Pagination
          mt="20"
          params={params}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
          isLoading={isLoading}
          currentPage={currentPageIndex}
        />
      )}
    </>
  );
}

export { Followed };
