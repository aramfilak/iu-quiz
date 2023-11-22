import {
  useColorModeValue,
  Flex,
  CloseButton,
  Box,
  Text,
  BoxProps,
  Button
} from '@chakra-ui/react';
import { NavItem } from '.';
import { routes } from '../utils/routes';
import { useNavigate } from 'react-router-dom';
import { usePersistStore } from '../sotres';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  isCollapsed: boolean;
  toggleSidebar?: () => void;
}

function SidebarNav({ onClose, isCollapsed, toggleSidebar, ...rest }: SidebarProps) {
  const navigate = useNavigate();
  const { activeNaveLinkIndex, setActiveNaveLinkIndex } = usePersistStore();

  return (
    <Box
      transition="0.1s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: isCollapsed ? '65px' : 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
        {/* ________________ Logo ____________________ */}
        <Text
          ml={isCollapsed ? '5px' : '25px'}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          LOGO
        </Text>
        <Text
          display={{ base: 'flex', md: isCollapsed ? 'none' : 'block' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          ml={{ base: 'auto', md: 'auto' }}
          mr={{ base: 'none', md: '25px' }}
        >
          IU~QUIZ
        </Text>
        <CloseButton
          style={{ marginLeft: 'auto', marginRight: '25px' }}
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Flex>

      {/* ________________ Nav Links ____________________ */}
      {Object.values(routes.Dashboard.children).map((link, index) => (
        <NavItem
          isActive={index === activeNaveLinkIndex}
          key={link.name}
          icon={link.icon}
          height="10px"
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

      {/* ________________ Collapse Button ____________________ */}
      <Button
        bottom="4"
        position="absolute"
        width="full"
        display={{ base: 'none', md: 'flex' }}
        onClick={toggleSidebar}
        variant="ghost"
        leftIcon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        right={isCollapsed ? 'initial' : '0'}
      ></Button>
    </Box>
  );
}

export { SidebarNav };
