import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
  UseDisclosureProps,
  useToast,
  Text,
  Box
} from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useStudentStore, usePersistStore } from '../../../../../stores';
import { routes } from '../../../../../utils/routes';
import { useRef } from 'react';

interface DeleteStudentAlertProps extends UseDisclosureProps {
  onClose: () => void;
  isOpen: boolean;
}

function DeleteStudentAlert({ isOpen, onClose }: DeleteStudentAlertProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { deleteStudent } = useStudentStore();
  const { setAccessToken, setIsAuthenticated } = usePersistStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleDeleteStudentProfile = async () => {
    const inputValue = `${inputRef.current?.value}`.trim().toLowerCase();
    if (inputValue === 'mein konto löschen') {
      onClose();

      const loading = toast({ status: 'loading', description: 'Es lädt...', duration: 60 * 1000 });

      const { success, message } = await deleteStudent();

      toast.close(loading);

      toast({ status: success ? 'success' : 'error', description: message });

      setAccessToken(null);
      setIsAuthenticated(false);
      navigate(routes.Authentication.children.SignUp.path);
    } else {
      toast({ status: 'error', description: 'Falsche Eingabe', variant: 'solid' });
    }
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader color="red.500" fontSize="3.5rem" display="flex" justifyContent="center">
          <FiAlertTriangle />
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody textAlign="center">
          <Text fontWeight="bold" mb="4">
            Möchten Sie Ihr Profil wirklich löschen? Diese Aktion kann nicht rückgängig gemacht
            werden und führt zum Verlust aller Ihrer gespeicherten Daten und Einstellungen.
          </Text>

          <FormControl>
            <FormLabel mb="2" fontWeight="500">
              Geben Sie
              <Box as="span" color="red.500">
                {' '}
                Mein Konto löschen{' '}
              </Box>
              ein, um fortzufahren
            </FormLabel>
            <Input ref={inputRef} placeholder="Mein Konto löschen" borderColor="teal.500" />
          </FormControl>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button colorScheme="red" ml={3} onClick={handleDeleteStudentProfile} type="button">
            Löschen
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteStudentAlert };
