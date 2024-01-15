import { Box, Drawer, DrawerContent, Flex, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useScreenSize } from '../../hooks';
import { DashboardContent, DashboardFooter, HeaderMenuBar, SidebarNav } from './layout';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isMobileScreen } = useScreenSize();

  return (
    <>
      <Box minH="calc(100vh - 74.4px)">
        <SidebarNav
          onClose={onClose}
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
          display={{ base: 'none', md: 'block' }}
        />
        {isMobileScreen && (
          <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="full">
            <DrawerContent>
              <SidebarNav onClose={onClose} isCollapsed={isSidebarCollapsed} />
            </DrawerContent>
          </Drawer>
        )}
        <HeaderMenuBar
          onOpen={onOpen}
          setCollapsedFalse={() => setSidebarCollapsed(false)}
        />

        <Flex flexDir="column" gap="1rem">
          <Box ml={{ base: 0, md: isSidebarCollapsed ? 16 : 60 }} padding="1rem" flex="1">
            <DashboardContent />
          </Box>
        </Flex>
      </Box>
      <DashboardFooter ml={{ base: 0, md: isSidebarCollapsed ? 16 : 60 }} />
    </>
  );
}

export { FAQs } from './FAQs';
export { FindQuiz } from './FindQuiz';
export { MyQuizzes } from './MyQuizzes';
export { Profile } from './Profile';
export { QuestionsEditor } from './QuestionsEditor';
export { Quiz } from './Quiz';
export { Settings } from './Settings';
export { GamePlay } from './GamePlay';
export { Dashboard };
