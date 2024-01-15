import {
  Avatar,
  Box,
  BoxProps,
  Button,
  HStack,
  IconButton,
  InputGroup,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CustomAlertDialog } from '../';
import { useQuizStore, useStudentStore } from '../../stores';
import { convertToGermanDate } from '../../utils/formatters';
import { validateFeedback } from '../../utils/helpers';
import { routes } from '../../utils/routes';
import { QuizFeedback } from '../../utils/types';

interface FeedbackProps extends BoxProps {
  feedback: QuizFeedback;
  onChange: () => Promise<void>;
  isLoading?: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Feedback({ feedback, onChange, setIsLoading, isLoading }: FeedbackProps) {
  const studentId = useStudentStore((state) => state.studentProfile?.studentId);
  const editFeedbackInputRef = useRef<HTMLTextAreaElement>(null);
  const updateFeedback = useQuizStore((state) => state.updateFeedback);
  const deleteFeedback = useQuizStore((state) => state.deleteFeedback);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleUpdateFeedback = () => {
    const updatedFeedback = validateFeedback(editFeedbackInputRef.current?.value || '');

    if (updatedFeedback) {
      setIsLoading(true);
      updateFeedback(feedback.quizId, feedback.id, updatedFeedback!)
        .then(() => onChange().finally(() => setIsLoading(false)))
        .catch(() => {
          toast({ status: 'error', description: 'Erstellung fehlgeschlagen' });
          setIsLoading(false);
        })
        .finally(() => setIsEditing(false));
    }
  };

  const handleDeleteFeedback = () => {
    setIsLoading(true);
    deleteFeedback(feedback.quizId, feedback.id).then(() =>
      onChange()
        .finally(() => setIsLoading(false))
        .catch(() => {
          toast({ status: 'error', description: 'Löschen fehlgeschlagen' });
          setIsLoading(false);
        })
    );
  };

  return (
    <Box
      borderRadius="md"
      key={feedback.id}
      bg="gray.100"
      _dark={{ bg: 'gray.600' }}
      w="full"
      p="2"
    >
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Löschen bestätigen"
        description="Möchten Sie Ihr Feedback wirklich löschen?"
        onSubmit={() => {
          onClose();
          handleDeleteFeedback();
        }}
        submitButtonLabel="Löschen"
      />
      <HStack mb="2">
        {/*___________________ Author Image ________________ */}
        <Avatar
          borderRadius="md"
          border="none"
          src={feedback.author.studentProfile?.profileImage?.url}
          size="sm"
        />

        {/*___________________ Profile Link ________________ */}
        <Button
          variant="link"
          fontWeight="bold"
          onClick={() =>
            navigate(
              `../${routes.Dashboard.children.Profile.mainPath}/${feedback.authorId}`
            )
          }
        >
          {feedback.author.studentProfile?.name}
        </Button>
        <Text ml="auto"> {convertToGermanDate(feedback.updatedAt)}</Text>
      </HStack>
      {isEditing ? (
        <HStack>
          {/*___________________ Edit Feedback Input ________________ */}
          <InputGroup gap="2" shadow="base">
            <Textarea
              ref={editFeedbackInputRef}
              rows={1}
              defaultValue={feedback.feedback}
              resize="none"
              variant="filled"
              placeholder="Feedback"
            />
          </InputGroup>

          {/*___________________ Update Feedback ________________ */}
          <Tooltip label="Speichern">
            <IconButton
              onClick={handleUpdateFeedback}
              variant="outline"
              type="button"
              aria-label="Änderungen Speichern"
              icon={<FaSave />}
              isLoading={isLoading}
            />
          </Tooltip>

          {/*___________________ Cancel Edit  ________________ */}
          <Tooltip label="Abbrechen">
            <IconButton
              onClick={() => setIsEditing(false)}
              variant="outline"
              type="button"
              aria-label="Bearbeiten Abbrechen"
              icon={<FaTimes />}
              isLoading={isLoading}
            />
          </Tooltip>
        </HStack>
      ) : (
        <Text>{feedback.feedback}</Text>
      )}

      {/*___________________ Action Buttons ________________ */}
      {feedback.authorId === studentId && !isEditing && (
        <HStack mt="2" justify="end">
          <Button variant="link" size="sm" onClick={() => setIsEditing(true)}>
            Bearbeiten
          </Button>
          <Button variant="link" size="sm" colorScheme="red" onClick={onOpen}>
            Löscchen
          </Button>
        </HStack>
      )}
    </Box>
  );
}

export { Feedback };
