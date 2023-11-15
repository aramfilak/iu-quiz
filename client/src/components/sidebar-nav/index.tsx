import { useColorModeValue, Flex, CloseButton, Box, Text, BoxProps } from '@chakra-ui/react';
import { NavItem } from '..';
import { routes } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

function SidebarNav({ onClose, ...rest }: SidebarProps) {
  const { QuizEditor, ActiveQuiz, Settings } = routes;
  const LinkItems = [QuizEditor, ActiveQuiz, Settings];
  const navigate = useNavigate();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* ________________ Logo ____________________ */}
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {/* ________________ Nav Links ____________________ */}

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={() => navigate(link.path)}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

export { SidebarNav };
