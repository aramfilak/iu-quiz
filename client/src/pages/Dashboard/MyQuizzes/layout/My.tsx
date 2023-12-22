import { useDisclosure, useToast } from '@chakra-ui/react';
import {
  CreateNewQuizCard,
  NoResultFound,
  QuizCard,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../../components';
import { QuizForm } from '../../../../components/QuizForm';
import { useFetch } from '../../../../hooks';
import { useQuizStore, useStudentStore } from '../../../../stores';
import { ActionType } from '../../../../utils/enums';
import { QuizQueryParams } from '../../../../utils/types';
import { useState } from 'react';
import Pagination from '../../../../components/Pagination';

function My() {
  const { studentProfile } = useStudentStore();
  const { setEditQuiz, setQuizFormActionType, deleteQuizById, getAllQuizzes } =
    useQuizStore();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const toast = useToast();
  const [params, setParams] = useState<QuizQueryParams>({
    page: '1',
    authorId: studentProfile?.studentId
  });
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const {
    isLoading,
    data: { quizzes: studentQuizzes = [], totalPages = 1 } = {},
    refetchData
  } = useFetch(() => getAllQuizzes(params));

  const handleDeleteQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) =>
      deleteQuizById(quizId)
        .then(() => resolve(refetchData()))
        .catch(() => reject())
    );

    toast.promise(response, {
      success: { description: 'Erfolgreich gelöscht' },
      error: { description: 'Löschen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
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
      {/*____________________ Create New Quiz Form ____________________*/}
      <QuizForm onClose={onClose} onFinal={refetchData} isOpen={isOpen} />
      {isLoading ? (
        <QuizCardSkeleton />
      ) : (
        <>
          <QuizCardsGrid>
            <CreateNewQuizCard
              minH="12rem"
              onClick={() => {
                setQuizFormActionType(ActionType.CREATE);
                setEditQuiz(null);
                onOpen();
              }}
            />
            {studentQuizzes?.map((quiz) => {
              return (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  displayPlayButton
                  displayOptionMenu={{
                    onDelete: () => handleDeleteQuiz(quiz.id),
                    onEdit: onOpen
                  }}
                />
              );
            })}
          </QuizCardsGrid>

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

          {!studentQuizzes?.length && (
            <NoResultFound
              mt="20"
              mb="2"
              title="Keine eigenen Quiz gefunden"
              description="Sie können Ihr eigenes Quiz erstellen, indem Sie auf die Schaltfläche „Neues Quiz“ klicken"
            />
          )}
        </>
      )}
    </>
  );
}

export { My };
