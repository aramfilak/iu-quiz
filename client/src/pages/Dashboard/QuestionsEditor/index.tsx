import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { Quiz } from '../../../utils/types';
import { useQuizStore } from '../../../stores';

function QuestionsEditor() {
  const { quizId } = useParams();
  const { getQuizById } = useQuizStore();
  const { isLoading, data: quiz } = useFetch<Quiz>(() => getQuizById(Number(quizId)));

  if (isLoading) {
    return <div>isLoading....</div>;
  }
  return (
    <div>
      {quiz?.quizQuestions &&
        quiz?.quizQuestions.map(({ question }) => {
          return <div>{question}</div>;
        })}
    </div>
  );
}

export { QuestionsEditor };
