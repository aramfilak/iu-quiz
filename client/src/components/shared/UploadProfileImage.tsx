import { FiXCircle, FiRefreshCw, FiPlusCircle, FiInfo } from 'react-icons/fi';
import {
  Avatar,
  FlexProps,
  useToast,
  FormLabel,
  Input,
  Button,
  Flex,
  useDisclosure,
  Text
} from '@chakra-ui/react';
import { useStudentStore } from '../../stores';
import { CustomAlertDialog } from '../dialogs';
import { useState } from 'react';

function UploadProfileImage(rest: FlexProps) {
  const toast = useToast();
  const { studentProfile, uploadImage, deleteImage } = useStudentStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = ({
    target: { files }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const image = files ? files[0] : null;

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      const response = new Promise((resolve, reject) => {
        uploadImage(formData)
          .then(() => resolve(true))
          .catch(() => reject())
          .finally(() => setIsLoading(false));
      });

      toast.promise(response, {
        success: { description: 'Profilebild hochgeladen' },
        error: { description: 'Hochgeladen fehlgeschlagen' },
        loading: { description: 'Es lädt..' }
      });
    }
  };

  const handleDeleteImage = () => {
    setIsLoading(true);
    const response = new Promise((resolve, reject) => {
      deleteImage()
        .then(() => resolve(true))
        .catch(() => reject())
        .finally(() => setIsLoading(false));
    });

    toast.promise(response, {
      success: { description: 'Profilebild gelöscht' },
      error: { description: 'Löschen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  return (
    <>
      <CustomAlertDialog
        onClose={onClose}
        isOpen={isOpen}
        title="Profil Bild Löschen"
        description="Sind Sie sicher, dass Sie Ihr Profilbild löschen möchten?"
        onSubmit={() => {
          handleDeleteImage();
          onClose();
        }}
        submitButtonLabel="Löschen"
      />

      <Flex {...rest} gap="0.5rem">
        <Avatar
          src={studentProfile?.profileImage?.url}
          size={{ base: 'lg', lg: 'xl' }}
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
            isLoading={isLoading}
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
            cursor={isLoading ? 'not-allowed' : 'pointer'}
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
        <Input
          id="profileImage"
          type="file"
          onChange={handleImageUpload}
          display="none"
          isDisabled={isLoading}
        />
      </Flex>
      {/*_____________________ Image Size Info ____________________ */}
      <Text display="flex" alignItems="center" gap="1">
        <FiInfo /> Bildformate png, jpg und jpeg. maximale Größe 5 MB
      </Text>
    </>
  );
}

export { UploadProfileImage };
