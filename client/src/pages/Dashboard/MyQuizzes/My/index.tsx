import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuizStore, useStudentStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';
import {
  CreateNewQuiz,
  QuizCard,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../../components';

function My() {
  const [studentQuizzes, setStudentQuizzes] = useState<Quiz[]>([]);
  const { studentProfile } = useStudentStore();
  const { isLoading, deleteQuizById, getAllQuizzes } = useQuizStore();
  const toast = useToast();

  const fetchStudentQuizzes = async () => {
    setStudentQuizzes(await getAllQuizzes({ authorId: studentProfile?.studentId }));
  };

  const handleDeleteQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) =>
      deleteQuizById(quizId)
        .then(() => resolve(fetchStudentQuizzes()))
        .catch(() => reject())
    );

    toast.promise(response, {
      success: { description: 'Erfolgreich gelöscht' },
      error: { description: 'Löschen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  useEffect(() => {
    fetchStudentQuizzes();
  }, []);

  return (
    <>
      {isLoading ? (
        <QuizCardSkeleton />
      ) : (
        <QuizCardsGrid>
          <CreateNewQuiz onFinal={fetchStudentQuizzes} minH="12rem" />
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
