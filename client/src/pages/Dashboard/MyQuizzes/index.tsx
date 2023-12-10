import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageHeader } from '../../../components/shared';

import { Followed, My } from './layout';

function MyQuizzes() {
  return (
    <>
      <PageHeader
        title="Meine Quiz"
        description="Dein Wissen. Deine Quiz. Alles im Überblick."
      />
      <Tabs>
        <TabList>
          <Tab>Meine</Tab>
          <Tab>Gefolgt</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TabPanel>
              <My />
            </TabPanel>
          </TabPanel>
          <TabPanel>
            <Followed />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export { MyQuizzes };
