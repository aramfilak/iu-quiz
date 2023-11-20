import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from '@chakra-ui/react';
import { FiEye, FiEdit3 } from 'react-icons/fi';
import { useStudentStore } from '../../../../sotres';
import { PageHeader } from '../../../../components';
import { Edit } from './Edit';
import { View } from './View';

function Profile() {
  const { studentProfile } = useStudentStore();

  const [isMobileView] = useMediaQuery('(max-width: 480px)');

  return (
    <>
      {/*------------------- Header --------------------*/}
      <PageHeader
        title={`${studentProfile?.name} Profil`}
        description="Dein Profil, deine Geschichte. Gestalte es einzigartig."
      />
      <Tabs>
        <TabList gap="5" mb="2" pb="2">
          <Tab>
            <FiEye />
            {!isMobileView && (
              <Box as="span" ml="2">
                Vorschau
              </Box>
            )}
          </Tab>

          <Tab>
            <FiEdit3 />
            {!isMobileView && (
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
