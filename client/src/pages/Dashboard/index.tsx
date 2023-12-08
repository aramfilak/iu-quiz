import { useState } from 'react';
import { HeaderMenuBar, SidebarNav, PageFooter } from '../../components';
import {
  Box,
  Container,
  Drawer,
  DrawerContent,
  useDisclosure,
  Flex
} from '@chakra-ui/react';
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
      <HeaderMenuBar
        onOpen={onOpen}
        setCollapsedFalse={() => setSidebarCollapsed(false)}
      />

      <Flex flexDir="column" minHeight="89.3vh" gap="1rem">
        <Box ml={{ base: 0, md: isSidebarCollapsed ? 16 : 60 }} padding="1rem" flex="1">
          <Container maxWidth="container.xl" padding="0">
            <Outlet />
          </Container>
        </Box>
      </Flex>
      <PageFooter ml={{ base: 0, md: isSidebarCollapsed ? 16 : 60 }} />
    </Box>
  );
}

export { Dashboard };
