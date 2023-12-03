import { Card, CardBody, CardBodyProps, useDisclosure } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import courseOfStudies from '../data/courseOfStudy.json';
import { useStudentStore } from '../stores';
import { CreateQuizForm } from './CreateQuizForm';

interface CreateNewQuizProps extends CardBodyProps {
  onFinal: () => void;
}

function CreateNewQuiz({ onFinal, ...rest }: CreateNewQuizProps) {
  const { studentProfile } = useStudentStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/*____________________ Create New Quiz Form ____________________*/}
      <CreateQuizForm
        onClose={onClose}
        onFinal={onFinal}
        isOpen={isOpen}
        defaultCourseOfStudy={studentProfile?.courseOfStudy || courseOfStudies[0].name}
      />
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
