import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { HeaderMenuBar, SidebarNav } from '../../components';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarNav onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarNav onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <HeaderMenuBar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/*-------------------- Sub Page ------------------*/}
        <Outlet />
      </Box>
    </Box>
  );
}

export { Dashboard };
