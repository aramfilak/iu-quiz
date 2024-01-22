import {
  Box,
  FormLabel,
  InputGroup,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaPlus, FaRegQuestionCircle, FaSync } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import {
  BoxWrapper,
  GoBackButton,
  NoResultFound,
  PageHeader,
  PageSkeleton,
  QuestionForm
} from '../../../components';
import { useFetch } from '../../../hooks';
import { usePersistStore, useQuizStore } from '../../../stores';
import { ActionType } from '../../../utils/enums';
import { Quiz, QuizQuestion } from '../../../utils/types';

const emptyQuestion = {
  quizId: 0,
  question: '',
  quizAnswers: [
    {
      answer: '',
      answerDescription: '',
      isRightAnswer: true
    },
    {
      answer: '',
      answerDescription: '',
      isRightAnswer: false
    }
  ]
};

function QuestionsEditor() {
  const { quizId } = useParams();
  const getQuizById = useQuizStore((state) => state.getQuizById);
  const {
    isLoading,
    data: quiz,
    refetchData
  } = useFetch<Quiz>(() => getQuizById(Number(quizId)));
  const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(null);
  const questionFormsPanelIndex = usePersistStore(
    (state) => state.questionFormsPanelIndex
  );
  const setQuestionFormsPanelIndex = usePersistStore(
    (state) => state.setQuestionFormsPanelIndex
  );

  useEffect(() => {
    if (quiz) {
      setSelectedQuestion(quiz.quizQuestions[0]);
      emptyQuestion.quizId = quiz.id;
    }
  }, [quiz]);

  return (
    <Box paddingInline={{ lg: '4rem', xl: '10rem' }}>
      <PageHeader title="Fragen Editor" description="Ganz nach deinem Wunsch gestaltet" />
      <GoBackButton mb="4" />

      {isLoading ? (
        <PageSkeleton />
      ) : (
        <>
          {/*___________________________ Question Edit Form ___________________________*/}

          <Tabs
            defaultIndex={questionFormsPanelIndex}
            onChange={(index) => setQuestionFormsPanelIndex(index)}
          >
            <TabList mb="10" flexDir={{ base: 'column', md: 'row' }}>
              <Tab gap="2">
                Eine Frage aktualisieren <FaSync />
              </Tab>
              <Tab gap="2">
                Neue Frage erstellen
                <FaPlus />
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {/*___________________________ Question Menu___________________________*/}
                <BoxWrapper mb="8">
                  <InputGroup flexDir="column">
                    <FormLabel gap="2" display="flex" alignItems="center">
                      <FaRegQuestionCircle /> Zu aktualisierende Frage
                    </FormLabel>
                    <Select
                      onChange={(e) => {
                        const index = Number(e.target.value);
                        quiz?.quizQuestions &&
                          setSelectedQuestion(quiz?.quizQuestions[index]);
                      }}
                      borderRadius="md"
                      bg="gray.50"
                      cursor="pointer"
                    >
                      {quiz?.quizQuestions &&
                        quiz?.quizQuestions
                          .sort((a, b) => a.id - b.id)
                          .map((question, index) => (
                            <option value={index} key={question.id}>{`${index + 1} ⚡️ ${
                              question.question
                            }`}</option>
                          ))}
                    </Select>
                  </InputGroup>
                </BoxWrapper>

                {selectedQuestion ? (
                  <QuestionForm
                    actionType={ActionType.UPDATE}
                    questionData={selectedQuestion}
                    onSubmit={() => {
                      setSelectedQuestion(null);
                      refetchData();
                    }}
                  />
                ) : (
                  <NoResultFound
                    mt="20"
                    mb="2"
                    title="Es gibt keine Fragen zum Bearbeiten"
                    description="Sie können eine neue Frage erstellen, indem Sie auf das Formular „Neue Frage erstellen“ klicken"
                  />
                )}
              </TabPanel>
              <TabPanel>
                <QuestionForm
                  onSubmit={() => {
                    setSelectedQuestion(null);
                    refetchData();
                  }}
                  actionType={ActionType.CREATE}
                  questionData={emptyQuestion}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </Box>
  );
}

export { QuestionsEditor };
