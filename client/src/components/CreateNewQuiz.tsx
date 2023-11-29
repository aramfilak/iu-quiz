import {
  Button,
  Card,
  CardBody,
  CardBodyProps,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

function CreateNewQuiz({ ...rest }: CardBodyProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const handleCreateNewQuiz = () => {};
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/*____________________ Quiz Title ____________________*/}
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input ref={initialRef} placeholder="Quiz Title" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr="3" colorScheme="gray" onClick={onClose}>
              Abbrechen
            </Button>
            <Button onClick={handleCreateNewQuiz}>Speichern</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*____________________ Create New Quiz Card ____________________*/}
      <Card {...rest}>
        <CardBody
          onClick={onOpen}
          borderRadius="md"
          w="full"
          h="full"
          boxShadow="none"
          border="2px dashed"
          borderColor="gray.400"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="xl"
          gap="2"
          color="gray.400"
          transition="all 0.2s ease"
          fontWeight="600"
          _hover={{ color: 'gray.500', borderColor: 'gray.500' }}
          _dark={{
            color: 'gray.500',
            borderColor: 'gray.500',
            _hover: { color: 'gray.400', borderColor: 'gray.400' }
          }}
        >
          <FaPlus />
          Neues Quiz
        </CardBody>
      </Card>
    </>
  );
}

export { CreateNewQuiz };
