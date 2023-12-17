import { Box } from '@chakra-ui/react';
import { QuizFeedback } from '../../../../utils/types';

interface FeedbacksProps {
  feedBacks: QuizFeedback[];
}

function Feedbacks({ feedBacks }: FeedbacksProps) {
  return <Box>{feedBacks.length}</Box>;
}

export { Feedbacks };
