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
      w={{ base: 'full', md: isCollapsed ? '4.1rem' : 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
        {/* ________________ Logo ____________________ */}
        <Text
          ml={isCollapsed ? '0.3rem' : '1.5rem'}
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
          mr={{ base: 'none', md: '1.6rem' }}
        >
          IU~QUIZ
        </Text>
        <CloseButton
          style={{ marginLeft: 'auto', marginRight: '1.6rem' }}
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Flex>

      <Box mt="2.2rem">
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

      {/* ________________ Collapse Button ____________________ */}
      <Button
        top="4rem"
        height="2.1rem"
        position="absolute"
        width="full"
        display={{ base: 'none', md: 'flex' }}
        onClick={toggleSidebar}
        variant="ghost"
        leftIcon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        right={isCollapsed ? 'initial' : '0'}
        alignItems="center"
        pl="1.5rem"
      ></Button>
    </Box>
  );
}

export { SidebarNav };
