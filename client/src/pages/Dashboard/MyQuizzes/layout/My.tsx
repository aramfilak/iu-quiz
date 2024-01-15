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

function My() {
  const studentProfile = useStudentStore((state) => state.studentProfile);
  const setActiveQuiz = useQuizStore((state) => state.setActiveQuiz);
  const setQuizFormActionType = useQuizStore((state) => state.setQuizFormActionType);
  const deleteQuizById = useQuizStore((state) => state.deleteQuizById);
  const getAllQuizzes = useQuizStore((state) => state.getAllQuizzes);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const toast = useToast();
  const { isLoading, data, refetchData } = useFetch(() =>
    getAllQuizzes({ authorId: studentProfile?.studentId })
  );
  const studentQuizzes = data?.quizzes;

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
                setActiveQuiz(null);
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
