import { TabProps } from '@chakra-ui/react';

interface QuizProps extends TabProps {
  quizIdNumber: string | undefined;
}

function Questions({ quizIdNumber }: QuizProps) {
  return <div>index; Quiz-ID: {quizIdNumber}</div>;
}

export { Questions };
