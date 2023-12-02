import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  CreateNewQuiz,
  NoQuizzes,
  QuizCard,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../../components';
import { useQuizStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';

function My() {
  const [studentQuizzes, setStudentQuizzes] = useState<Quiz[]>([]);
  const { isLoading, deleteQuizById, getStudentQuizzes } = useQuizStore();
  const toast = useToast();

  const fetchStudentQuizzes = async () => {
    const quizzes = await getStudentQuizzes();
    setStudentQuizzes(() => quizzes);
  };

  useEffect(() => {
    fetchStudentQuizzes();
  }, []);

  const handleDeleteQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) => {
      deleteQuizById(quizId).then(({ success }) => {
        if (success) {
          resolve(fetchStudentQuizzes());
        } else {
          reject();
        }
      });
    });

    toast.promise(response, {
      success: { description: 'Erfolgreich gelöscht' },
      error: { description: 'Löschen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  return isLoading ? (
    <QuizCardSkeleton />
  ) : (
    <>
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
      {studentQuizzes.length < 1 && (
        <NoQuizzes
          mt="20"
          title="Noch keine Quiz?"
          description="Erstellen Sie jetzt Ihr erstes Quiz, indem Sie auf „Neues Quiz“ klicken"
        />
      )}
    </>
  );
}

export { My };
