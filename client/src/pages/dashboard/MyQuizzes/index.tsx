import { useState, useEffect } from 'react';
import { Box, SkeletonText, Grid } from '@chakra-ui/react';
import { PageHeader, QuizCard } from '../../../components';
import { useQuizStore, useStudentStore } from '../../../stores';

function MyQuizzes() {
  const { studentQuizzes, getAllQuizzes } = useQuizStore();
  const { studentProfile } = useStudentStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllQuizzes({
      authorId: studentProfile?.studentId
    }).then(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader title={'Meine Quiz'} description="Dein Wissen. Deine Quiz. Alles im Überblick." />
      {isLoading ? (
        <Grid gridTemplateColumns="repeat(auto-fit, minmax(16rem, 1fr))">
          {new Array(8).fill(
            <Box p={6} m={2}>
              <SkeletonText mt="4" noOfLines={5} spacing="3" skeletonHeight="3" />
            </Box>
          )}
        </Grid>
      ) : (
        <Grid gridTemplateColumns="repeat(auto-fit, minmax(16rem, 1fr))" gap="1rem">
          {studentQuizzes?.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
        </Grid>
      )}
    </>
  );
}

export { MyQuizzes };
