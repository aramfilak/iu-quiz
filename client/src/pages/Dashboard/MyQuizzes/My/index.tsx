import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CreateNewQuiz, QuizCard, QuizCardSkeleton, QuizCardsGrid } from '../../../../components';
import { useQuizStore } from '../../../../stores';
import { Quiz } from '../../../../utils/types';

function My() {
  const { isLoading, deleteQuizById, getStudentQuizzes } = useQuizStore();
  const toast = useToast();
  const [studentQuizzes, setStudentQuizzes] = useState<Quiz[]>([]);

  const fetchStudentQuizzes = () => {
    getStudentQuizzes().then((quizzes) => {
      setStudentQuizzes(quizzes);
    });
  };

  useEffect(() => {
    fetchStudentQuizzes();
  }, []);

  const handleDeleteQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) => {
      deleteQuizById(quizId).then(({ success }) => {
        if (success) {
          resolve(true);
          fetchStudentQuizzes();
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

  return (
    <>
      {isLoading ? (
        <QuizCardSkeleton />
      ) : (
        <QuizCardsGrid>
          <CreateNewQuiz onCreate={fetchStudentQuizzes} minH="12rem" />
          {studentQuizzes?.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onDelete={() => handleDeleteQuiz(quiz.id)}
              isAuthor={true}
            />
          ))}
        </QuizCardsGrid>
      )}
    </>
  );
}

export { My };
