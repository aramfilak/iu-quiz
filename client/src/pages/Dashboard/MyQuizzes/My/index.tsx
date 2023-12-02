import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  CreateNewQuiz,
  QuizCard,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../../components';
import { useQuizStore, useStudentStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';

function My() {
  const [studentQuizzes, setStudentQuizzes] = useState<Quiz[]>([]);
  const { studentProfile } = useStudentStore();
  const { isLoading, deleteQuizById, getAllQuizzes } = useQuizStore();
  const toast = useToast();

  const fetchStudentQuizzes = async () => {
    const quizzes = await getAllQuizzes({ authorId: studentProfile?.studentId });
    setStudentQuizzes(quizzes);
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

  return isLoading ? (
    <QuizCardSkeleton />
  ) : (
    <QuizCardsGrid>
      <CreateNewQuiz onCreate={fetchStudentQuizzes} minH="12rem" />
      {studentQuizzes.length > 0 &&
        studentQuizzes?.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            displayPlayButton
            displayOptionMenu={{ onDelete: () => handleDeleteQuiz(quiz.id) }}
          />
        ))}
    </QuizCardsGrid>
  );
}

export { My };
