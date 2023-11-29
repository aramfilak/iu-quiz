import { Grid, SkeletonText, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { CreateNewQuiz, QuizCard } from '../../../../components';
import { useQuizStore } from '../../../../stores';

function My() {
  const { studentQuizzes, isLoading, deleteQuizById, getStudentQuizzes } = useQuizStore();
  const toast = useToast();

  useEffect(() => {
    if (!studentQuizzes) {
      getStudentQuizzes();
    }
  }, []);

  const handleDeleteQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) => {
      deleteQuizById(quizId).then(({ success }) => {
        if (success) {
          resolve(true);
          getStudentQuizzes();
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
        <Grid gridTemplateColumns="repeat(auto-fill, minmax(15rem, 1fr))" gap="1rem">
          {Array.from({ length: 10 }, (_, index) => (
            <SkeletonText key={index} noOfLines={7} spacing="2" skeletonHeight="4" />
          ))}
        </Grid>
      ) : (
        <Grid gridTemplateColumns="repeat(auto-fill, minmax(15rem, 1fr))" gap="1rem">
          <CreateNewQuiz minH="12rem" />
          {studentQuizzes?.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onDelete={() => handleDeleteQuiz(quiz.id)} />
          ))}
        </Grid>
      )}
    </>
  );
}

export { My };
