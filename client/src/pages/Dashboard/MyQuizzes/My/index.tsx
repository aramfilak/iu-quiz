import { useToast } from '@chakra-ui/react';
import { useQuizStore, useStudentStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';
import {
  CreateNewQuiz,
  QuizCard,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../../components';
import { useFetch } from '../../../../hooks';

function My() {
  const { studentProfile } = useStudentStore();
  const { deleteQuizById, getAllQuizzes } = useQuizStore();
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
      {isLoading ? (
        <QuizCardSkeleton />
      ) : (
        <QuizCardsGrid>
          <CreateNewQuiz onFinal={refetchData} minH="12rem" />
          {studentQuizzes?.map((quiz) => {
            return (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                displayPlayButton
                displayOptionMenu={{
                  onDelete: () => handleDeleteQuiz(quiz.id)
                }}
              />
            );
          })}
        </QuizCardsGrid>
      )}
    </>
  );
}

export { My };
