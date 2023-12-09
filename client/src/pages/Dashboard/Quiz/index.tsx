import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';

function Quiz() {
  const { quizId } = useParams();
  const { getQuizById } = useQuizStore();
  const { isLoading } = useFetch(() => getQuizById(Number(quizId)));
  return <div>{isLoading}</div>;
}

export { Quiz };
