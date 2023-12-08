import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useStudentStore } from '../stores';

interface ContactFormAlertProps {
  onClose: () => void;
  isOpen: boolean;
}

function ContactFormAlert({ onClose, isOpen }: ContactFormAlertProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const { sendContactEmail } = useStudentStore();
  const [isLoading, setIsLoading] = useState<boolean>();

  const [formData, setFormData] = useState({
    subject: '',
    description: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.subject !== '' && formData.description !== '') {
      const response = new Promise((resolve, reject) => {
        sendContactEmail(formData.subject, formData.description)
          .then(() => resolve(true))
          .catch(() => reject())
          .finally(() => {
            setFormData({
              subject: '',
              description: ''
            });
            setIsLoading(false);
            onClose();
          });
      });

      toast.promise(response, {
        success: { description: 'Wir werden uns in Kürze bei Ihnen melden' },
        error: { description: 'E-Mail senden fehlgeschlagen' },
        loading: { description: 'Es lädt..' }
      });
    } else {
      toast({
        status: 'error',
        description: 'Felder sind nicht ausgefüllt',
        variant: 'solid'
      });
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
      <AlertDialogOverlay>
        <AlertDialogContent>
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Support-Kontakt
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl mb={4}>
                <FormLabel>Betreff:</FormLabel>
                <Input
                  value={formData.subject}
                  onChange={handleInputChange}
                  type="text"
                  name="subject"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Beschreibung:</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                isDisabled={isLoading}
                ref={cancelRef}
                colorScheme="gray"
                onClick={onClose}
              >
                Abbrechen
              </Button>
              <Button
                isDisabled={
                  formData.subject === '' || formData.description === '' || isLoading
                }
                type="submit"
                colorScheme="teal"
                ml={3}
              >
                Senden
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export { ContactFormAlert };
