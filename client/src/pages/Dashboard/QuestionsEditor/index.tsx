import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { Quiz, QuizQuestion } from '../../../utils/types';
import { useQuizStore } from '../../../stores';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonText,
  VStack
} from '@chakra-ui/react';
import { NoResultFound, PageHeader, QuestionForm } from '../../../components';
import { FaArrowDown } from 'react-icons/fa';
import { useState } from 'react';

function QuestionsEditor() {
  const { quizId } = useParams();
  const { getQuizById } = useQuizStore();
  const { isLoading, data: quiz } = useFetch<Quiz>(() => getQuizById(Number(quizId)));
  const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(null);
  return (
    <Box>
      <PageHeader title="Fragen Editor" description="Ganz nach deinem Wunsch gestaltet" />
      {isLoading ? (
        <SkeletonText
          marginInline="auto"
          noOfLines={7}
          spacing="4"
          skeletonHeight="6rem"
          borderRadius="md"
        />
      ) : (
        <VStack gap="4">
          <Menu isLazy matchWidth>
            <MenuButton as={Button} rightIcon={<FaArrowDown />} width="min(100%,30rem)">
              Wähle eine Frage aus
            </MenuButton>
            <MenuList maxHeight="20rem" overflowY="auto">
              {quiz?.quizQuestions &&
                quiz?.quizQuestions.map((question) => {
                  return (
                    <MenuItem
                      fontWeight="600"
                      key={question.id}
                      onClick={() => setSelectedQuestion(question)}
                    >{`⚡️ ${question.question}`}</MenuItem>
                  );
                })}
            </MenuList>
          </Menu>

          {selectedQuestion ? (
            <QuestionForm questionData={selectedQuestion} />
          ) : (
            <NoResultFound
              mt="20"
              mb="2"
              title="Keine ausgewählte Frage"
              description="Bitte wählen Sie die Frage aus, die Sie bearbeiten möchten"
            />
          )}
        </VStack>
      )}
    </Box>
  );
}

export { QuestionsEditor };
