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
  MenuList,
  useDisclosure,
  useColorMode
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { useAuthStore, useStudentStore } from '../../stores';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { CustomAlertDialog } from '../dialogs';
interface MobileProps extends FlexProps {
  onOpen: () => void;
  setCollapsedFalse: () => void;
}

function HeaderMenuBar({ onOpen: handleOpen, setCollapsedFalse, ...rest }: MobileProps) {
  const { signOut } = useAuthStore();
  const { studentProfile } = useStudentStore();
  const navigate = useNavigate();
  const signOutAlert = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 0 }}
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
        onClick={() => {
          setCollapsedFalse();
          handleOpen();
        }}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/*______________________ Handle Sign-out Alert Dialog ________________________ */}
      <CustomAlertDialog
        onClose={signOutAlert.onClose}
        isOpen={signOutAlert.isOpen}
        onSubmit={() => {
          signOutAlert.onClose();
          signOut();
          navigate(routes.Authentication.children.SignIn.path);
        }}
        submitButtonLabel="Abmelden"
        title="Abmelden"
        description="Sind Sie sicher, dass Sie sich abmelden möchten?"
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                {/* ________________ Student Image ____________________ */}
                <Avatar
                  bg="teal.500"
                  src={studentProfile?.profileImage?.url}
                  size="md"
                  borderRadius="md"
                />

                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {/* ________________ Student Name ____________________ */}
                  <Text fontWeight="bold" fontSize="sm">
                    {studentProfile?.name}
                  </Text>

                  {/*__________________ Student E-mail __________________________ */}
                  <Text fontSize="xs" color={useColorModeValue('gray.600', 'gray.300')}>
                    {studentProfile?.student.email}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>

            {/*________________ Option Menu __________________________ */}
            <MenuList borderColor={useColorModeValue('gray.200', 'gray.700')}>
              {/* ________________ Theme Button ____________________ */}
              <MenuItem
                icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? 'Dunkelmodus' : 'Hellermodus'}
              </MenuItem>
              <MenuDivider />

              {/*________________ Open Sign-out Dialog ______________________ */}
              <MenuItem color="red.500" icon={<FiLogOut />} onClick={signOutAlert.onOpen}>
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
