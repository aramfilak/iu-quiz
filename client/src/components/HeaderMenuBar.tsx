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
  AlertDialog,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useColorMode
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown, FiLogOut, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { useAuthStore, useStudentStore } from '../sotres';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import { useRef } from 'react';
interface MobileProps extends FlexProps {
  onOpen: () => void;
}

function HeaderMenuBar({ onOpen: handleOpen, ...rest }: MobileProps) {
  const { signOut } = useAuthStore();
  const { studentProfile } = useStudentStore();
  const navigate = useNavigate();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

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
        onClick={handleOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/*______________________ Handle Sign-out Alert Dialog ________________________ */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Abmelden
            </AlertDialogHeader>

            <AlertDialogBody>Sind Sie sicher, dass Sie sich abmelden möchten?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Abbrechen
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  signOut();
                  navigate(routes.Authentication.path);
                }}
                ml={3}
              >
                Abmelden
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                {/* ________________ Student Image ____________________ */}
                <Avatar
                  bg="teal.500"
                  src={studentProfile?.profileImage.url}
                  size={{ base: 'sm', xl: 'md' }}
                  borderRadius="md"
                />

                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {/* ________________ Student Nick ____________________ */}
                  <Text fontWeight="bold" fontSize="sm">
                    {studentProfile?.nickName}
                  </Text>

                  {/*__________________ Student E-mail __________________________ */}
                  <Text fontSize="xs" color={useColorModeValue('gray.600', 'gray.300')}>
                    {studentProfile?.studentAuth.email}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>

            {/*________________ Option Menu __________________________ */}
            <MenuList borderColor={useColorModeValue('gray.200', 'gray.700')}>
              {/*________________ Profile Link __________________________ */}
              <MenuItem
                icon={<FiUser />}
                onClick={() => navigate(routes.Dashboard.children.Profile.path)}
              >
                Profile
              </MenuItem>

              {/* ________________ Theme Button ____________________ */}
              <MenuItem
                icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? 'Dunkelmodus' : 'Hellermodus'}
              </MenuItem>
              <MenuDivider />

              {/*________________ Open Sign-out Dialog ______________________ */}
              <MenuItem color="red.600" icon={<FiLogOut />} onClick={onOpen}>
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
