import {
  Avatar,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr
} from '@chakra-ui/react';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BoxWrapper } from '../../../../components/shared';
import { convertToGermanDate } from '../../../../utils/formatters';
import { routes } from '../../../../utils/routes';
import { Quiz } from '../../../../utils/types';

function QuizHeader(quiz: Quiz) {
  const navigate = useNavigate();
  const { authorId, updatedAt, courseOfStudy, course, popularity, size, title, student } =
    quiz;

  return (
    <BoxWrapper title="Allgemeine Infos">
      <TableContainer>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td fontWeight="bold">
                <Avatar
                  borderRadius="md"
                  src={student.studentProfile?.profileImage?.url}
                />
              </Td>
              <Td>
                <Button
                  variant="link"
                  fontWeight="bold"
                  onClick={() =>
                    navigate(
                      `../${routes.Dashboard.children.Profile.mainPath}/${authorId}`
                    )
                  }
                >
                  {student.studentProfile?.name}
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Title</Td>
              <Td>{title}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Anzahl</Td>
              <Td>{size}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Letztes Update</Td>
              <Td>{convertToGermanDate(updatedAt)}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Studiengang</Td>
              <Td>{courseOfStudy}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Module</Td>
              <Td>{course}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Beliebtheit</Td>
              <Td>{popularity}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack w="full" justify="end">
        <Button
          alignSelf="end"
          colorScheme="blue"
          leftIcon={<FaHeart />}
          aria-label="„Gefällt mir“-Knopf"
        >
          Gefällt mir
        </Button>

        <Button alignSelf="end" colorScheme="teal" leftIcon={<FaPlay />}>
          Spielen
        </Button>
      </HStack>
    </BoxWrapper>
  );
}

export { QuizHeader };
