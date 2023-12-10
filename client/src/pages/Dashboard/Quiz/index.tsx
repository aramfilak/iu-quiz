import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';

function Quiz() {
  const { quizId } = useParams();
  const { getQuizById } = useQuizStore();
  const { data: quizData } = useFetch(() => getQuizById(Number(quizId)));
  return <div>{quizData?.authorId}</div>;
}

export { Quiz };
