import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useRef } from 'react';

interface CustomAlertDialogProps {
  onClose: () => void;
  onSubmit: () => void;
  isOpen: boolean;
  title: string;
  description: string;
  submitButtonLabel: string;
}

function CustomAlertDialog({
  onClose,
  isOpen,
  onSubmit,
  submitButtonLabel,
  title,
  description
}: CustomAlertDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
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
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Abbrechen
            </Button>
            <Button colorScheme="red" onClick={onSubmit} ml={3}>
              {submitButtonLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export { CustomAlertDialog };
