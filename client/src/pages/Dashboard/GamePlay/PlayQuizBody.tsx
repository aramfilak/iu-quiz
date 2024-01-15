import { QuizQuestion } from '../../../utils/types';
import { BoxWrapper } from '../../../components';

interface PlayQuizBodyProps {
  quizQuestions: QuizQuestion;
}

function PlayQuizBody({ quizQuestions }: PlayQuizBodyProps) {
  return <BoxWrapper w="full">{quizQuestions.question}</BoxWrapper>;
}

export { PlayQuizBody };
