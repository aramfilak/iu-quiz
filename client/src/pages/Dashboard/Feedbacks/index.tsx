import {
  BoxProps,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { BoxWrapper } from '../../../components/shared';
import { useQuizStore } from '../../../stores';
import { QuizFeedback } from '../../../utils/types';
import { Feedback } from './Feedback';
import { validateFeedback } from '../../../utils/helpers';

interface FeedbacksProps extends BoxProps {
  quizId: number;
  feedbacks: QuizFeedback[];
  onChange: () => void;
}

function Feedbacks({ quizId, feedbacks, onChange, ...rest }: FeedbacksProps) {
  const createFeedback = useQuizStore((state) => state.createFeedback);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleCreateFeedback = () => {
    const feedback = validateFeedback(feedbackInputRef.current?.value || '');

    if (feedback) {
      setIsLoading(true);
      createFeedback(quizId, feedback!)
        .then(() => onChange())
        .catch(() => toast({ status: 'error', description: 'Änderung fehlgeschlagen' }))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <BoxWrapper {...rest} justifyContent="space-between">
      {/*________________________ Feedbacks  ____________________*/}

      <VStack w="full" maxH="300px" gap="2" overflow="auto">
        {feedbacks.length === 0 ? (
          <Text textAlign="center" fontWeight="600">
            Teilen Sie Ihr Feedback mit, um die Qualität des Quiz zu steigern
          </Text>
        ) : (
          feedbacks.map((feedback) => {
            return <Feedback onChange={onChange} feedback={feedback} />;
          })
        )}
      </VStack>
      {/*________________________ Feedback Input ____________________*/}
      <InputGroup gap="2" shadow="base">
        <Textarea
          rows={1}
          resize="none"
          variant="filled"
          placeholder="Feedback"
          ref={feedbackInputRef}
        />
        <InputRightElement>
          <Tooltip label="feedback posten">
            <IconButton
              isLoading={isLoading}
              onClick={handleCreateFeedback}
              variant="link"
              transform={'translate(-10px,9px)'}
              h="56px"
              type="button"
              aria-label="feedback posten"
              icon={<FaCommentAlt />}
            />
          </Tooltip>
        </InputRightElement>
      </InputGroup>
    </BoxWrapper>
  );
}

export { Feedbacks };
