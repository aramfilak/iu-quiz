import {
  Alert,
  AlertIcon,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  Flex
} from '@chakra-ui/react';
import { FiMail, FiUserCheck, FiSave, FiUserX, FiAlertTriangle } from 'react-icons/fi';
import { UploadProfileImage } from '../../../../components';
import { useState, useRef } from 'react';
import { useStudentStore, usePersistStore } from '../../../../sotres';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../utils/routes';
import { CustomAlert } from '../../../../utils/types';

function Edit() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const nickNameInputRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { studentProfile, updateStudent, deleteStudent } = useStudentStore();
  const { setAccessToken, setIsAuthenticated } = usePersistStore();
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handelChange = () => {
    const nickNameCurrentValue = nickNameInputRef.current?.value.trim();
    const nickNameDefaultValue = nickNameInputRef.current?.defaultValue;

    if (nickNameCurrentValue !== nickNameDefaultValue) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nickNameInputRef.current?.value;

    if (!name) {
      setAlert({ status: 'warning', message: 'Bitte alle Felder ausfüllen' });
    }

    setAlert({ status: 'loading', message: 'Es lädt...' });

    const { success, message } = await updateStudent({ name });

    setAlert({ status: success ? 'success' : 'error', message: message });

    if (success) {
      setIsChanged(false);
    }
    setIsSubmitting(false);
  };

  const handleDeleteStudentProfile = async () => {
    const loading = toast({ status: 'loading', description: 'Es lädt...', duration: 60 * 1000 });

    const { success, message } = await deleteStudent();

    toast.close(loading);
    toast({ status: success ? 'success' : 'error', description: message });
    setAccessToken(null);
    setIsAuthenticated(false);
    navigate(routes.Authentication.path);
    setIsSubmitting(false);
  };

  return (
    <>
      {/*------------------- Alert Dialog --------------------*/}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader
            color="red.500"
            fontSize="3.5rem"
            display="flex"
            justifyContent="center"
          >
            <FiAlertTriangle />
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Möchten Sie Ihr Profil wirklich löschen? Diese Aktion kann nicht rückgängig gemacht
            werden und führt zum Verlust aller Ihrer gespeicherten Daten und Einstellungen.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Abbrechen
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteStudentProfile}>
              Löschen
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <form onSubmit={handleSubmit} style={{ width: 'min(100%, 20rem)' }}>
        <Flex flexDir="column" gap="1rem">
          {/*------------------- Response Alert --------------------*/}
          {alert && (
            <Alert status={alert.status} mb="3">
              <AlertIcon />
              {alert.message}
            </Alert>
          )}
          {/*---------------- Upload Image -------------*/}
          <UploadProfileImage />
          {/*------------------- Email --------------------*/}
          <Box width="100%">
            <FormLabel mt="2" htmlFor="email" m="0" color="gray.500">
              Email
            </FormLabel>
            <InputGroup>
              <Input
                onChange={() => setIsChanged(true)}
                ref={nickNameInputRef}
                borderColor="teal.700"
                autoComplete="on"
                id="nick-name"
                placeholder="max muster"
                disabled={true}
                defaultValue={studentProfile?.student.email}
              />
              <InputLeftElement color="gray.500">
                <FiMail />
              </InputLeftElement>
            </InputGroup>
          </Box>
          {/*------------------- Nick Name --------------------*/}
          <Box width="100%">
            <FormLabel mt="2" htmlFor="nick-name" m="0">
              Name
            </FormLabel>
            <InputGroup>
              <Input
                onChange={handelChange}
                ref={nickNameInputRef}
                borderColor="teal.700"
                autoComplete="on"
                id="nick-name"
                placeholder="max muster"
                defaultValue={studentProfile?.name}
              />
              <InputLeftElement>
                <FiUserCheck />
              </InputLeftElement>
            </InputGroup>
          </Box>

          <Button
            width="100%"
            colorScheme="teal"
            type="submit"
            disabled={isSubmitting}
            isDisabled={!isChanged}
            leftIcon={<FiSave />}
          >
            Speichern
          </Button>

          {/*------------------- Delete Profile -----------------*/}
          <Button
            width="100%"
            alignSelf="start"
            colorScheme="red"
            type="button"
            disabled={isSubmitting}
            onClick={onOpen}
            leftIcon={<FiUserX />}
          >
            Profile Löschen
          </Button>
        </Flex>
      </form>
    </>
  );
}

export { Edit };
