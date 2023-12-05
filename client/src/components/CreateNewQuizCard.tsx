import { Card, CardBody, CardProps } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

function CreateNewQuizCard(rest: CardProps) {
  return (
    <Card {...rest}>
      <CardBody
        borderRadius="md"
        w="full"
        h="full"
        boxShadow="none"
        border="3px dashed"
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
  );
}

export { CreateNewQuizCard };
