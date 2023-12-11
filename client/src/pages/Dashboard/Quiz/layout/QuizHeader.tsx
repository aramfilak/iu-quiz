import {
  Button,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BoxWrapper } from '../../../../components/shared';
import { useFetch } from '../../../../hooks';
import { useStudentStore } from '../../../../stores';
import { convertToGermanDate } from '../../../../utils/formatters';
import { routes } from '../../../../utils/routes';
interface QuizHeaderProps {
  authorId: string;
  title: string;
  updatedAt: Date;
  courseOfStudy: string;
  course: string;
  popularity: number;
  size: number;
  isLoading: boolean;
}

function QuizHeader({
  authorId,
  title,
  updatedAt,
  size,
  courseOfStudy,
  course,
  popularity
}: QuizHeaderProps) {
  const { getStudentsByIds } = useStudentStore();
  const { data } = useFetch(() => getStudentsByIds(authorId));
  const navigate = useNavigate();
  const authorData = data && data[0];

  return (
    <BoxWrapper>
      <TableContainer>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td fontWeight="bold">Autor</Td>
              <Td>
                {authorData?.name ? (
                  <Button
                    variant="link"
                    fontWeight="bold"
                    onClick={() =>
                      navigate(
                        `../${routes.Dashboard.children.Profile.mainPath}/${authorData?.studentId}`
                      )
                    }
                  >
                    {authorData?.name}
                  </Button>
                ) : (
                  <SkeletonText noOfLines={1} />
                )}
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
      <Button alignSelf="end" colorScheme="blue" leftIcon={<FaPlay />}>
        Spielen
      </Button>
    </BoxWrapper>
  );
}

export { QuizHeader };
