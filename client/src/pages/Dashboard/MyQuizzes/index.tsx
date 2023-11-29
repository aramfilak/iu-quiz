import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageHeader } from '../../../components';
import { My } from './My';
import { Followed } from './Followed';

function MyQuizzes() {
  return (
    <>
      <PageHeader title={'Meine Quiz'} description="Dein Wissen. Deine Quiz. Alles im Überblick." />
      <Tabs>
        <TabList gap="5" mb="8" pb="2">
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
