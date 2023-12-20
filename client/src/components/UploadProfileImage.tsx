import {
  Avatar,
  Button,
  Flex,
  FlexProps,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiInfo, FiPlusCircle, FiRefreshCw, FiXCircle } from 'react-icons/fi';
import { useStudentStore } from '../stores';
import { CustomAlertDialog } from '.';

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

      uploadImage(formData)
        .catch(() =>
          toast({ status: 'error', description: 'Hochgeladen fehlgeschlagen' })
        )
        .finally(() => setIsLoading(false));
    }
  };

  const handleDeleteImage = () => {
    setIsLoading(true);

    deleteImage()
      .catch(() => toast({ status: 'error', description: 'Löschen fehlgeschlagen' }))
      .finally(() => setIsLoading(false));
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
          w={{ base: '5.5rem', md: '6rem', xl: '7rem' }}
          h={{ base: '5.5rem', md: '6rem', xl: '7rem' }}
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
