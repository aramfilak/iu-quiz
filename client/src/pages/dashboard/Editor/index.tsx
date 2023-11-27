import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageHeader } from '../../../components';
import { Quiz } from './Quiz';
import { Questions } from './Questions';

function Editor() {
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
              <Quiz />
            </TabPanel>
          </TabPanel>
          <TabPanel>
            <Questions />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export { Editor };
