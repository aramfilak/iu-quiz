import React from 'react';
import { FiXCircle, FiRefreshCw, FiPlusCircle } from 'react-icons/fi';
import {
  Avatar,
  FlexProps,
  Tooltip,
  useToast,
  FormLabel,
  Input,
  Button,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { useStudentStore } from '../sotres';

function UploadProfileImage(rest: FlexProps) {
  const toast = useToast();
  const { studentProfile, uploadImage, deleteImage } = useStudentStore();

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
    <Flex
      {...rest}
      position="relative"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Avatar
        src={studentProfile?.profileImage.url}
        size={{ base: 'xl', md: '2xl' }}
        borderRadius="md"
      />
      <Flex marginBlock="2" justifyContent="space-between" gap="2">
        {/*_____________________ Delete Image ____________________ */}

        <Tooltip label="Das Bild wird sofort gelöscht" borderRadius="md">
          <Button
            width="100%"
            isDisabled={studentProfile?.profileImage.url ? false : true}
            size="md"
            cursor="pointer"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            colorScheme="red"
            onClick={handleDeleteImage}
          >
            <FiXCircle />
          </Button>
        </Tooltip>
        {/*_____________________ Update or Add Image ____________________ */}
        <Tooltip label="Bildformate png, jpg und jpeg. maximale Größe 5 MB" borderRadius="md">
          <FormLabel
            display="flex"
            justifyContent="center"
            width="100%"
            m="0"
            color={useColorModeValue('white', 'gray.800')}
            bg={useColorModeValue('teal.500', 'teal.200')}
            borderRadius="md"
            paddingInline="4"
            paddingBlock="3"
            htmlFor="profileImage"
            cursor="pointer"
          >
            {studentProfile?.profileImage.url ? (
              <>
                <FiRefreshCw />
              </>
            ) : (
              <>
                <FiPlusCircle />
              </>
            )}
          </FormLabel>
        </Tooltip>
      </Flex>

      {/*_____________________  Image Input ____________________ */}
      <Input id="profileImage" type="file" onChange={handleImageUpload} display="none" />
    </Flex>
  );
}

export { UploadProfileImage };
