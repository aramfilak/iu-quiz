import {
  Box,
  VStack,
  Avatar,
  Text,
  Button,
  Textarea,
  useEditable
} from '@chakra-ui/react';
import { useState } from 'react';
import { QuizFeedback } from '../../../../utils/types';

interface FeedbackProps {
  feedback: QuizFeedback;
  index: number;
  handleEdit: (index: number) => void;
  handleSave: (index: number, nextValue: string) => void;
}

const Feedback = ({ feedback, index, handleEdit, handleSave }: FeedbackProps) => {
  const { getEditButtonProps, getPreviewProps, isEditing } = useEditable({
    onSubmit: (nextValue) => handleSave(index, nextValue)
  });

  return (
    <Box display="flex" alignItems="center" mt={4}>
      <Avatar src={feedback.author.studentProfile?.name} />
      <Box ml={4}>
        <Text fontWeight="bold">{feedback.feedback}</Text>
        {isEditing ? (
          <Textarea {...getEditButtonProps()} defaultValue={feedback.feedback} />
        ) : (
          <Text {...getPreviewProps()}>{feedback.feedback}</Text>
        )}

        <Button size="sm" onClick={() => handleEdit(index)}>
          'Save'
        </Button>
      </Box>
    </Box>
  );
};

interface UserCommentsProps {
  feedbacks: Array<QuizFeedback>;
}

const UserComments = ({ feedbacks }: UserCommentsProps) => {
  const [feedbackStates, setFeedbackStates] = useState(
    feedbacks.map((feedback) => ({
      ...feedback,
      editMode: false,
      currentComment: feedback.feedback
    }))
  );

  const handleEdit = (index: number) => {
    setFeedbackStates((prevState) => {
      const newState = [...prevState];
      newState[index].editMode = !newState[index].editMode;
      return newState;
    });
  };

  const handleSave = (index: number, nextValue: string) => {
    setFeedbackStates((prevState) => {
      const newState = [...prevState];
      newState[index].currentComment = nextValue;
      newState[index].editMode = false;
      return newState;
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      {feedbackStates.map((feedback, index) => (
        <Feedback
          key={index}
          feedback={feedback}
          index={index}
          handleEdit={handleEdit}
          handleSave={handleSave}
        />
      ))}
    </VStack>
  );
};

export default UserComments;
