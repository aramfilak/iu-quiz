import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { Quiz, QuizQuestion } from '../../../utils/types';
import { usePersistStore, useQuizStore } from '../../../stores';
import {
  InputGroup,
  InputLeftAddon,
  Select,
  SkeletonText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import { NoResultFound, PageHeader, QuestionForm } from '../../../components';
import { useEffect, useState } from 'react';
import { ActionType } from '../../../utils/enums';
import { FaPlus, FaSync } from 'react-icons/fa';

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
  const { getQuizById } = useQuizStore();
  const {
    isLoading,
    data: quiz,
    refetchData
  } = useFetch<Quiz>(() => getQuizById(Number(quizId)));
  const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(null);
  const { questionFormsPanelIndex, setQuestionFormsPanelIndex } = usePersistStore();

  useEffect(() => {
    if (quiz) {
      setSelectedQuestion(quiz.quizQuestions[0]);
      emptyQuestion.quizId = quiz.id;
    }
  }, [quiz]);

  return (
    <>
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
          {/*___________________________ Question Edit Form ___________________________*/}

          <Tabs
            defaultIndex={questionFormsPanelIndex}
            onChange={(index) => setQuestionFormsPanelIndex(index)}
            variant="soft-rounded"
          >
            <TabList mb="10">
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
                <InputGroup width="fit-content" margin="auto">
                  <InputLeftAddon
                    fontWeight="bold"
                    border="2px solid"
                    borderColor="teal.500"
                    bg="teal"
                    color="white"
                  >
                    Zu aktualisierende Frage
                  </InputLeftAddon>
                  <Select mb="10" bg="gray.50" cursor="pointer">
                    {quiz?.quizQuestions && (
                      <>
                        {quiz?.quizQuestions.map((question, index) => {
                          return (
                            <option
                              key={question.id}
                              onClick={() => setSelectedQuestion(question)}
                            >{`${index + 1} ${question.question}`}</option>
                          );
                        })}
                      </>
                    )}
                  </Select>
                </InputGroup>

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
                    title="Keine Frage"
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
    </>
  );
}

export { QuestionsEditor };
