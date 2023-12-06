import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { Quiz, QuizQuestion } from '../../../utils/types';
import { useQuizStore } from '../../../stores';
import { Box, InputGroup, InputLeftAddon, Select, SkeletonText } from '@chakra-ui/react';
import { NoResultFound, PageHeader, QuestionForm } from '../../../components';
import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';

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
          noOfLines={20}
          spacing="4"
          skeletonHeight="4"
          borderRadius="md"
        />
      ) : (
        <>
          {/*___________________________ Question Menu___________________________*/}
          <InputGroup>
            <InputLeftAddon bg="teal" color="white">
              <FaQuestion />
            </InputLeftAddon>
            <Select placeholder=" Wähle eine Frage aus" mb="10">
              {quiz?.quizQuestions &&
                quiz?.quizQuestions.map((question, index) => {
                  return (
                    <option
                      key={question.id}
                      onClick={() => setSelectedQuestion(question)}
                    >{`${index + 1} ${question.question}`}</option>
                  );
                })}
            </Select>
          </InputGroup>

          {/*___________________________ Question Edit Form ___________________________*/}

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
        </>
      )}
    </Box>
  );
}

export { QuestionsEditor };
