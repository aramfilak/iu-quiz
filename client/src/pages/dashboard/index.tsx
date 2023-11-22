import { useState } from 'react';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { HeaderMenuBar, SidebarNav } from '../../components';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box minH="100vh">
      <SidebarNav
        onClose={onClose}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        setCollapsedTrue={() => setSidebarCollapsed(true)}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="full">
        <DrawerContent>
          <SidebarNav
            onClose={onClose}
            isCollapsed={isSidebarCollapsed}
            setCollapsedTrue={() => setSidebarCollapsed(true)}
          />
        </DrawerContent>
      </Drawer>
      <HeaderMenuBar onOpen={onOpen} setCollapsedFalse={() => setSidebarCollapsed(false)} />
      <Box ml={{ base: 0, md: isSidebarCollapsed ? 16 : 60 }} padding="1rem">
        <Outlet />
      </Box>
    </Box>
  );
}

export { Dashboard };
