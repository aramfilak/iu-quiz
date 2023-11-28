import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageHeader } from '../../../components';
import { Quiz } from './Quiz';
import { Questions } from './Questions';
import { useParams } from 'react-router-dom';

function Editor() {
  const { quizId } = useParams();

  return (
    <>
      <PageHeader title={'Editor'} description="Erstelle dein eigenes Quiz" />
      <Tabs>
        <TabList gap="5" mb="8" pb="2">
          <Tab>Quiz</Tab>
          <Tab>Fragen</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TabPanel>
              <Quiz quizIdNumber={quizId} />
            </TabPanel>
          </TabPanel>
          <TabPanel>
            <Questions quizIdNumber={quizId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export { Editor };
