import { useState } from 'react';
import { HeaderMenuBar, SidebarNav } from './layout';
import { Box, Container, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useScreenSize } from '../../hooks';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isMobileScreen } = useScreenSize();
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box minH="100vh">
      <SidebarNav
        onClose={onClose}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        display={{ base: 'none', md: 'block' }}
      />
      {isMobileScreen && (
        <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="full">
          <DrawerContent>
            <SidebarNav onClose={onClose} isCollapsed={isSidebarCollapsed} />
          </DrawerContent>
        </Drawer>
      )}
      <HeaderMenuBar onOpen={onOpen} setCollapsedFalse={() => setSidebarCollapsed(false)} />

      <Box ml={{ base: 0, md: isSidebarCollapsed ? 16 : 60 }} padding="1rem">
        <Container maxWidth="container.xl" padding="0">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export { Dashboard };
export { Editor } from './Editor';
export { FAQs } from './FAQs';
export { Profile } from './Profile';
export { MeineQuiz } from './MyQuizzes';
