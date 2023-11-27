import { CloseButton, Box, BoxProps, Image, Center, IconButton, Tooltip } from '@chakra-ui/react';
import { NavItem } from '../../../components';
import { routes } from '../../../utils/routes';
import { useNavigate } from 'react-router-dom';
import { usePersistStore } from '../../../stores';
import logo from '../../../assets/logo.png';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  isCollapsed: boolean;
  toggleSidebar?: () => void;
}

function SidebarNav({ onClose, isCollapsed, toggleSidebar, ...rest }: SidebarProps) {
  const navigate = useNavigate();
  const { activeNaveLinkIndex, setActiveNaveLinkIndex } = usePersistStore();

  const boxShadowDark = isCollapsed ? '' : '1px solid #4a5568';
  return (
    <Box
      transition="0.1s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      _dark={{ bg: 'gray.900', borderRightColor: 'gray.700' }}
      w={{ base: 'full', md: isCollapsed ? '4.1rem' : 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Center justifyContent={{ base: 'start', md: 'center' }}>
        {/* ________________ Logo ____________________ */}
        <Image src={logo} alt="iu quiz app logo" width={{ base: '5rem' }} />
        <CloseButton
          style={{ marginLeft: 'auto', marginRight: '1.6rem' }}
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Center>

      <Box mt="4rem" position="relative">
        {/* ________________ Collapse Button ____________________ */}
        <Tooltip label={isCollapsed ? 'Öffnen' : 'Schlißen'} placement="right">
          <IconButton
            display={{ base: 'none', md: 'flex' }}
            position="absolute"
            top="-2.7rem"
            height="20%"
            borderRadius="xl"
            right={isCollapsed ? '25%' : '-4%'}
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            fontSize="1.1rem"
            size="sm"
            boxShadow={isCollapsed ? 'none' : '1px 0 0 0.2px rgba(0, 0, 0,0.1)'}
            colorScheme="gray"
            bg="white"
            color="teal"
            _hover={{ bg: 'white' }}
            _dark={{
              bg: 'gray.800',
              color: 'teal.200',
              boxShadow: 'none',
              borderRight: boxShadowDark,
              _hover: { bg: 'gray.800' }
            }}
          >
            {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
          </IconButton>
        </Tooltip>

        {/* ________________ Nav Links ____________________ */}
        {Object.values(routes.Dashboard.children).map((link, index) => (
          <NavItem
            isActive={index === activeNaveLinkIndex}
            key={link.name}
            icon={link.icon}
            onClick={() => {
              setActiveNaveLinkIndex(index);
              navigate(link.path);
              onClose();
            }}
            tooltip={isCollapsed ? link.name : undefined}
          >
            {isCollapsed ? null : link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
}

export { SidebarNav };
