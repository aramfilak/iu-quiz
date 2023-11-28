import { TabProps } from '@chakra-ui/react';

interface QuizProps extends TabProps {
  quizIdNumber: string | undefined;
}

function Quiz({ quizIdNumber }: QuizProps) {
  return <div>Quiz-ID: {quizIdNumber}</div>;
}

export { Quiz };
