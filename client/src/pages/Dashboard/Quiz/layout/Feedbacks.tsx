import {
  Avatar,
  Box,
  BoxProps,
  Button,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  Tooltip,
  VStack
} from '@chakra-ui/react';
import { FaCommentAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BoxWrapper } from '../../../../components/shared';
import { convertToGermanDate } from '../../../../utils/formatters';
import { routes } from '../../../../utils/routes';
import { QuizFeedback } from '../../../../utils/types';

interface FeedbacksProps extends BoxProps {
  feedbacks: QuizFeedback[];
}

function Feedbacks({ feedbacks, ...rest }: FeedbacksProps) {
  const navigate = useNavigate();
  console.log(feedbacks.length === 0);
  return (
    <BoxWrapper {...rest} justifyContent="space-between">
      {/*________________________ Feedbacks  ____________________*/}

      <VStack w="full" maxH="270px" gap="4">
        {feedbacks.length === 0 ? (
          <Text textAlign="center" fontWeight="600">
            Teilen Sie Ihr Feedback mit, um die Qualität des Quiz zu steigern
          </Text>
        ) : (
          feedbacks.map((feedback) => {
            return (
              <Box
                key={feedback.id}
                bg="gray.100"
                _dark={{ bg: 'gray.600' }}
                w="full"
                p="2"
                borderRadius="md"
              >
                <HStack>
                  <Avatar
                    borderRadius="md"
                    border="none"
                    src={feedback.author.studentProfile?.profileImage?.url}
                    size="sm"
                  />
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
                <Text mt="2">{feedback.feedback}</Text>
              </Box>
            );
          })
        )}
      </VStack>
      {/*________________________ Feedback Input ____________________*/}
      <InputGroup gap="2" shadow="base">
        <Textarea rows={1} resize="none" variant="filled" placeholder="Feedback" />
        <InputRightElement>
          <Tooltip label="feedback posten">
            <IconButton
              variant="link"
              transform={'translate(-10px,9px)'}
              h="56px"
              type="submit"
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
