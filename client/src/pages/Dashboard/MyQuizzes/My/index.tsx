import { Box, Grid, SkeletonText, useToast } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { CreateNewQuiz, QuizCard } from '../../../../components';
import { useQuizStore, useStudentStore } from '../../../../stores';

function My() {
  const { studentQuizzes, getAllQuizzes, setStudentQuizzes, deleteQuizById } = useQuizStore();
  const { studentProfile } = useStudentStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  const fetchQuizzes = () => {
    setIsLoading(true);
    getAllQuizzes({
      authorId: studentProfile?.studentId
    }).then(({ success, message, data }) => {
      if (success && data) {
        setStudentQuizzes(data);
      } else {
        toast({ status: 'error', description: message });
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) => {
      deleteQuizById(quizId).then(({ success }) => {
        if (success) {
          resolve(true);
          fetchQuizzes();
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
        <Grid gridTemplateColumns="repeat(auto-fill, minmax(16rem, 1fr))">
          {new Array(8).fill(
            <Box p={6} m={2}>
              <SkeletonText mt="4" noOfLines={5} spacing="3" skeletonHeight="3" />
            </Box>
          )}
        </Grid>
      ) : (
        <Grid gridTemplateColumns="repeat(auto-fill, minmax(16rem, 1fr))" gap="1rem">
          <CreateNewQuiz minH="14rem" />
          {studentQuizzes?.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onDelete={() => handleDeleteQuiz(quiz.id)} />
          ))}
        </Grid>
      )}
    </>
  );
}

export { My };
