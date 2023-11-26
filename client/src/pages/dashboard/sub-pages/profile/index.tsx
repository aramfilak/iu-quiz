import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FiEye, FiEdit3 } from 'react-icons/fi';
import { useStudentStore } from '../../../../stores';
import { PageHeader } from '../../../../components';
import { Edit } from './Edit';
import { View } from './View';
import { useScreenSize } from '../../../../hooks';

function Profile() {
  const { studentProfile } = useStudentStore();
  const { isMobileScreen } = useScreenSize();

  return (
    <>
      {/*------------------- Header --------------------*/}
      <PageHeader
        title={`${studentProfile?.name} Profil`}
        description="Dein Profil, deine Geschichte. Gestalte es einzigartig."
      />
      <Tabs>
        <TabList gap="5" mb="8" pb="2">
          <Tab>
            <FiEye />
            {!isMobileScreen && (
              <Box as="span" ml="2">
                Vorschau
              </Box>
            )}
          </Tab>

          <Tab>
            <FiEdit3 />
            {!isMobileScreen && (
              <Box as="span" ml="2">
                Bearbeiten
              </Box>
            )}
          </Tab>
        </TabList>
        <TabPanels>
          {/*------------------- Preview Panel --------------------*/}
          <TabPanel>
            <View />
          </TabPanel>
          {/*------------------- Edit Panel --------------------*/}
          <TabPanel>
            <Edit />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export { Profile, View };
