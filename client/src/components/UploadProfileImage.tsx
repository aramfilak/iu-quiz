import React from 'react';
import { FiEdit, FiXCircle, FiUpload } from 'react-icons/fi';
import {
  Avatar,
  BoxProps,
  Box,
  Tooltip,
  useToast,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  Text,
  MenuList
} from '@chakra-ui/react';
import { useStudentStore } from '../sotres';

function UploadProfileImage(rest: BoxProps) {
  const toast = useToast();
  const { student, uploadImage, deleteImage } = useStudentStore();

  const handleDeleteImage = async () => {
    const loadingToast = toast({ status: 'loading', description: 'Es lädt...' });

    const { success, message } = await deleteImage();

    toast.close(loadingToast);

    toast({ status: success ? 'success' : 'error', description: message });
  };

  const handleImageUpload = async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    const image = files ? files[0] : null;

    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const loadingToast = toast({ status: 'loading', description: 'Es lädt...' });

      const { success, message } = await uploadImage(formData);

      toast.close(loadingToast);
      toast({ status: success ? 'success' : 'error', description: message });
    }
  };

  return (
    <Box {...rest} position="relative">
      <Avatar
        borderWidth="2px"
        borderStyle="solid"
        borderColor="teal.500"
        _hover={{ filter: 'gray' }}
        src={student?.image}
        size={{ base: 'xl', md: '2xl' }}
        bg="teal.500"
      />

      <Menu>
        {/*_____________________ Menu Items ____________________ */}
        <MenuButton
          p={2}
          color="white"
          borderWidth="3px"
          borderColor="white"
          borderRadius="50%"
          position="absolute"
          bottom="0"
          left="70%"
          type="button"
          transition="all 0.2s"
          bg="teal.500"
          _hover={{ bg: 'teal.300', borderColor: 'teal.300' }}
          _expanded={{ bg: 'teal.500' }}
        >
          <FiEdit />
        </MenuButton>

        <MenuList>
          {/*_____________________ Upload Image ____________________ */}

          <MenuItem>
            <Tooltip maxW="12rem" label="Bildformate png, jpg und jpeg. maximale Größe 5 MB">
              <FormLabel
                fontSize="0.9em"
                width="100%"
                htmlFor="profileImage"
                cursor="pointer"
                display="flex"
                alignItems="center"
                gap="0.5rem"
              >
                <FiUpload />
                Bild hinzufügen
              </FormLabel>
            </Tooltip>
          </MenuItem>
          {/*_____________________ Delete Image ____________________ */}

          <MenuItem onClick={handleDeleteImage} fontSize="0.9em">
            <Tooltip maxW="12rem" label="Das Bild wird sofort gelöscht">
              <Text
                width="100%"
                cursor="pointer"
                display="flex"
                alignItems="center"
                gap="0.5rem"
                color="red"
              >
                <FiXCircle /> Bild löschen
              </Text>
            </Tooltip>
          </MenuItem>
        </MenuList>
      </Menu>
      {/*_____________________  Image Input ____________________ */}
      <Input id="profileImage" type="file" onChange={handleImageUpload} display="none" />
    </Box>
  );
}

export { UploadProfileImage };
