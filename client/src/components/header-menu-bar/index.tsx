import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuthStore, useStudentStore } from '../../sotres';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

function HeaderMenuBar({ onOpen, ...rest }: MobileProps) {
  const { signOut } = useAuthStore();
  const { student } = useStudentStore();
  const navigate = useNavigate();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar bg="teal.500" src="" size="sm" />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {/* ________________ Student Nick ____________________ */}
                  <Text fontSize="sm"> {student?.nickName}</Text>
                  {/*__________________ Student E-mail __________________________ */}
                  <Text fontSize="xs" color="gray.600">
                    {student?.email}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>

            {/*________________ Option Menu __________________________ */}
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem icon={<FiUser />}>Profile</MenuItem>

              <MenuDivider />
              <MenuItem
                color="red.600"
                icon={<FiLogOut />}
                onClick={() => {
                  signOut();
                  navigate(routes.Authentication.path);
                }}
              >
                Abmelden
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}

export { HeaderMenuBar };
