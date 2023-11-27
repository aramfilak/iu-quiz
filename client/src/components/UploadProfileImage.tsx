import React, { useRef } from 'react';
import { FiXCircle, FiRefreshCw, FiPlusCircle, FiInfo } from 'react-icons/fi';
import {
  Avatar,
  FlexProps,
  useToast,
  FormLabel,
  Input,
  Button,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  Text
} from '@chakra-ui/react';
import { useStudentStore } from '../stores';

function UploadProfileImage(rest: FlexProps) {
  const toast = useToast();
  const { studentProfile, uploadImage, deleteImage } = useStudentStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDeleteImage = async () => {
    const loadingToast = toast({
      status: 'loading',
      description: 'Es lädt...',
      duration: 3.6e6
    });

    const { success, message } = await deleteImage();

    toast.close(loadingToast);

    toast({ status: success ? 'success' : 'error', description: message });
  };

  const handleImageUpload = async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    const image = files ? files[0] : null;

    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const loadingToast = toast({ status: 'loading', description: 'Es lädt...', duration: 3.6e6 });

      const { success, message } = await uploadImage(formData);

      toast.close(loadingToast);
      toast({ status: success ? 'success' : 'error', description: message });
    }
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Profil Bild Löschen</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Sind Sie sicher, dass Sie Ihr Profilbild löschen möchten?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Abbrechen
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                handleDeleteImage();
                onClose();
              }}
            >
              Löschen
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Flex {...rest} gap="0.5rem">
        <Avatar
          src={studentProfile?.profileImage?.url}
          size={{ base: 'xl', lg: '2xl' }}
          borderRadius="md"
        />

        <Flex flexDir="column" justifyContent="end" gap="2" flex="1">
          {/*_____________________ Delete Image ____________________ */}

          <Button
            p="0"
            width="100%"
            isDisabled={studentProfile?.profileImage?.url ? false : true}
            size="md"
            cursor="pointer"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            colorScheme="red"
            onClick={onOpen}
          >
            <Flex gap="0.5rem" alignItems="center">
              <FiXCircle />
              Löschen
            </Flex>
          </Button>

          {/*_____________________ Update or Add Image ____________________ */}
          <FormLabel
            _hover={{ bg: 'teal.600' }}
            display="flex"
            justifyContent="center"
            width="100%"
            color="white"
            bg="teal.500"
            _dark={{ bg: 'teal.200', color: 'gray.800' }}
            borderRadius="md"
            htmlFor="profileImage"
            cursor="pointer"
            p="2"
          >
            {studentProfile?.profileImage?.url ? (
              <Flex gap="0.5rem" alignItems="center">
                <FiRefreshCw />
                Aktualisieren
              </Flex>
            ) : (
              <Flex gap="0.5rem" alignItems="center">
                <FiPlusCircle />
                Hinzufügen
              </Flex>
            )}
          </FormLabel>
        </Flex>

        {/*_____________________  Image Input ____________________ */}
        <Input id="profileImage" type="file" onChange={handleImageUpload} display="none" />
      </Flex>
      {/*_____________________ Image Size Info ____________________ */}
      <Text display="flex" alignItems="center" gap="1">
        <FiInfo /> Bildformate png, jpg und jpeg. maximale Größe 5 MB
      </Text>
    </>
  );
}

export { UploadProfileImage };
