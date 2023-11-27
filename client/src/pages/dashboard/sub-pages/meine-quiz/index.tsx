import { useState, ReactNode } from 'react';
import {
  Box,
  IconButton,
  Flex,
  Text,
  ChakraProvider,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  MenuItem
} from '@chakra-ui/react';
import { FaPlus, FaEdit, FaTrash, FaList } from 'react-icons/fa';
import { PageHeader } from '../../../../components';

const Rectangle = ({
  text,
  onEdit,
  onDelete
}: {
  text: ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Box
      width="200px"
      height="200px"
      border="1px"
      borderRadius="2xl"
      borderColor="teal.700"
      p={4}
      m={2}
      position="relative"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <Text>{text}</Text>
      <Flex position="absolute" top={2} right={2}>
        <Menu>
          <MenuButton as={IconButton} icon={<FaList />} size="sm" mr={2} aria-label="Menu" />
          <MenuList>
            <MenuItem onClick={onEdit} icon={<FaEdit />} aria-label="Edit">
              Edit
            </MenuItem>
            <MenuItem onClick={onDelete} icon={<FaTrash />} aria-label="Delete">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

function MeineQuiz() {
  const [rectangles, setRectangles] = useState(['Quiz 1']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRectangle = () => {
    const newRectangle = `Rectangle ${rectangles.length + 1}`;
    setRectangles([...rectangles, newRectangle]);
    handleCloseModal();
  };

  const handleEditRectangle = (index: number) => {
    // Implement editing logic here
    console.log(`Editing Rectangle ${index + 1}`);
  };

  const handleDeleteRectangle = (index: number) => {
    const updatedRectangles = [...rectangles];
    updatedRectangles.splice(index, 1);
    setRectangles(updatedRectangles);
  };

  return (
    <>
      <Box mx="auto" maxW="600px" mb="4">
        <PageHeader
          title={'Meine Quiz'}
          description="Dein Wissen. Deine Quiz. Alles im Überblick."
        />
        <ChakraProvider>
          <Flex direction="row" align="center" justify="center">
            {rectangles.map((text, index) => (
              <Rectangle
                key={index}
                text={text}
                onEdit={() => handleEditRectangle(index)}
                onDelete={() => handleDeleteRectangle(index)}
              />
            ))}
            <Box
              width="200px"
              height="200px"
              border="1px"
              borderRadius="2xl"
              borderColor="teal.700"
              p={4}
              m={2}
              position="relative"
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <Box display="flex" alignItems="center" onClick={handleOpenModal} cursor="pointer">
                <Flex direction="column" align="center" justify="center">
                  <Text>{'Neues Quiz'}</Text>
                  <IconButton
                    aria-label="Add"
                    icon={<FaPlus />}
                    size="sm"
                    colorScheme="teal"
                    mt={2}
                  />
                </Flex>
              </Box>
            </Box>
          </Flex>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Neues Quiz erstellen</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input placeholder="Title" mb={3} />
                <Input placeholder="Studiengang" mb={3} />
                <Input placeholder="Module" mb={6} />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={handleCloseModal}>
                  Abbrechen
                </Button>
                <Button colorScheme="teal" onClick={handleAddRectangle}>
                  Erstellen
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ChakraProvider>
      </Box>
    </>
  );
}

export { MeineQuiz };
