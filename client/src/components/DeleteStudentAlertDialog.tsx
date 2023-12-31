import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { usePersistStore, useStudentStore } from '../stores/index.tsx';
import { routes } from '../utils/routes.tsx';

interface DeleteStudentAlertProps {
  onClose: () => void;
  isOpen: boolean;
}

function DeleteStudentAlertDialog({ isOpen, onClose }: DeleteStudentAlertProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const deleteStudent = useStudentStore((state) => state.deleteStudent);
  const setAccessToken = usePersistStore((state) => state.setAccessToken);
  const setIsAuthenticated = usePersistStore((state) => state.setIsAuthenticated);
  const toast = useToast();
  const navigate = useNavigate();

  const handleDeleteStudentProfile = () => {
    const submissionMessage = String(inputRef.current?.value)
      .trim()
      .toLowerCase();

    if (submissionMessage === 'mein konto löschen') {
      const response = new Promise((resolve, reject) => {
        deleteStudent()
          .then(() => {
            setAccessToken(null);
            setIsAuthenticated(false);
            resolve(
              navigate(routes.Authentication.children.SignIn.path, { replace: true })
            );
          })
          .catch(() => reject())
          .finally(() => onClose());
      });

      toast.promise(response, {
        success: { description: 'Profile gelöscht' },
        error: { description: 'Löschen fehlgeschlagen' },
        loading: { description: 'Es lädt..' }
      });
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
        <AlertDialogHeader
          color="red.500"
          fontSize="3.5rem"
          display="flex"
          justifyContent="center"
        >
          <FiAlertTriangle />
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody textAlign="center">
          <Text fontWeight="bold" mb="4">
            Möchten Sie Ihr Konto wirklich löschen? Diese Aktion kann nicht rückgängig
            gemacht werden und führt zum Verlust aller Ihrer gespeicherten Daten und
            Einstellungen.
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
            <Input
              ref={inputRef}
              placeholder="Mein Konto löschen"
              borderColor="teal.500"
            />
          </FormControl>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={handleDeleteStudentProfile}
            type="button"
          >
            Löschen
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteStudentAlertDialog };
