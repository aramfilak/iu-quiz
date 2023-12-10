import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';
import { QuizHeader } from './layout';
import { Button, SkeletonText, VStack } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { PageHeader } from '../../../components/shared';

function Quiz() {
  const { quizId } = useParams();
  const { getQuizById } = useQuizStore();
  const { data: quizData, isLoading } = useFetch(() => getQuizById(Number(quizId)));
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Quiz" description="asdklf" />
      <VStack align="start">
        <Button leftIcon={<FaArrowLeft />} onClick={() => navigate(-1)}>
          Zurück
        </Button>

        {isLoading || !quizData ? (
          <SkeletonText height="20px" width="100px" />
        ) : (
          <QuizHeader
            updatedAt={quizData?.updatedAt}
            title={quizData?.title}
            course={quizData?.course}
            courseOfStudy={quizData?.courseOfStudy}
            size={quizData?.size}
            popularity={quizData?.popularity}
            authorId={quizData?.authorId}
            isLoading={isLoading}
          />
        )}
      </VStack>
    </>
  );
}

export { Quiz };
