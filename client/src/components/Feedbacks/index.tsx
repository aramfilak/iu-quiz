import { BoxProps, Button, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { BoxWrapper } from '..';
import { useQuizStore } from '../../stores';
import { parseJsonDataFromFormData, validateFeedback } from '../../utils/helpers';
import { QuizFeedback } from '../../utils/types';
import { Feedback } from './Feedback';
import { FeedbacksSkeleton } from './FeedbacksSkeleton';

interface FeedbacksProps extends BoxProps {
  quizId: number;
  feedbacks: QuizFeedback[];
  onChange: () => Promise<void>;
}

interface FormType {
  feedback: string;
}

function Feedbacks({ quizId, feedbacks, onChange, ...rest }: FeedbacksProps) {
  const createFeedback = useQuizStore((state) => state.createFeedback);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleCreateFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { feedback } = parseJsonDataFromFormData<FormType>(e);

    feedback = validateFeedback(feedback) || '';

    if (feedback) {
      setIsLoading(true);
      createFeedback(quizId, feedback!)
        .then(() => onChange().finally(() => setIsLoading(false)))
        .catch(() => {
          toast({ status: 'error', description: 'Änderung fehlgeschlagen' });
          setIsLoading(false);
        });
    }
  };

  return (
    <BoxWrapper {...rest} justifyContent="space-between">
      {/*________________________ Feedbacks  ____________________*/}
      <VStack w="full" maxH="300px" gap="2" overflow="auto">
        {isLoading ? (
          <FeedbacksSkeleton />
        ) : feedbacks.length === 0 ? (
          <Text textAlign="center" fontWeight="600">
            Teilen Sie Ihr Feedback mit, um die Qualität des Quiz zu steigern
          </Text>
        ) : (
          feedbacks.map((feedback) => {
            return (
              <Feedback
                key={feedback.id}
                onChange={onChange}
                feedback={feedback}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            );
          })
        )}
      </VStack>
      <form
        onSubmit={handleCreateFeedback}
        ref={(e) => e?.reset()}
        style={{ width: '100%' }}
      >
        {/*________________________ Feedback Input ____________________*/}
        <Textarea
          rows={1}
          resize="none"
          variant="filled"
          name="feedback"
          placeholder="Feedback"
          mb="2"
          ref={feedbackInputRef}
        />

        {/*________________________ Submit Button  ____________________*/}
        <Button
          ml="100%"
          transform="translateX(-100%)"
          isLoading={isLoading}
          type="submit"
          leftIcon={<FaCommentDots />}
        >
          Posten
        </Button>
      </form>
    </BoxWrapper>
  );
}

export { Feedbacks };
