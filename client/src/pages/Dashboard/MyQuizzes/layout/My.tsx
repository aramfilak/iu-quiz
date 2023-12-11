import { useDisclosure, useToast } from '@chakra-ui/react';
import { QuizForm } from '../../../../components/forms/QuizForm';
import {
  CreateNewQuizCard,
  QuizCard,
  QuizCardsGrid
} from '../../../../components/quiz-card';
import { NoResultFound } from '../../../../components/shared';
import { QuizCardSkeleton } from '../../../../components/skeletons';
import { useFetch } from '../../../../hooks';
import { useQuizStore, useStudentStore } from '../../../../stores';
import { ActionType } from '../../../../utils/enums';
import { Quiz } from '../../../../utils/types';

function My() {
  const { studentProfile } = useStudentStore();
  const { setEditQuiz, setQuizFormActionType, deleteQuizById, getAllQuizzes } =
    useQuizStore();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const toast = useToast();
  const {
    isLoading,
    data: studentQuizzes,
    refetchData
  } = useFetch<Quiz[]>(() => getAllQuizzes({ authorId: studentProfile?.studentId }));

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
