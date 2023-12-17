import {
  Avatar,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { HiPlay } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { BoxWrapper } from '../../../../components/shared';
import { useQuizStore, useStudentStore } from '../../../../stores';
import { convertToGermanDate } from '../../../../utils/formatters';
import { routes } from '../../../../utils/routes';
import { Quiz } from '../../../../utils/types';

interface QuizHeaderProps {
  quiz: Quiz;
  onChange: () => void;
}

function QuizHeader({ quiz, onChange }: QuizHeaderProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const { toggleLikeQuiz } = useQuizStore();
  const { studentProfile } = useStudentStore();
  const [isLoading, setIsLoading] = useState(false);
  const {
    authorId,
    updatedAt,
    courseOfStudy,
    course,
    likes,
    size,
    title,
    student,
    likedBy
  } = quiz;
  const isLiked = likedBy.find((player) => player.playerId === studentProfile?.studentId);

  const handleLikeQuiz = () => {
    setIsLoading(true);
    toggleLikeQuiz(quiz.id)
      .catch(() => toast({ status: 'error', description: 'Like fehlgeschlagen' }))
      .finally(() => {
        setIsLoading(false);
        onChange();
      });
  };

  return (
    <BoxWrapper title="Informationen">
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
              <Td fontWeight="bold">Likes</Td>
              <Td>{likes}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack w="full" justify="end" mt="4">
        <Button
          onClick={handleLikeQuiz}
          colorScheme={isLiked ? 'red' : 'blue'}
          aria-label="Like Knopf"
          leftIcon={isLiked ? <AiFillDislike /> : <AiFillLike />}
          isLoading={isLoading}
        >
          {isLiked ? 'Dislike' : 'Like'}
        </Button>

        <Button alignSelf="end" colorScheme="teal" leftIcon={<HiPlay />}>
          Spielen
        </Button>
      </HStack>
    </BoxWrapper>
  );
}

export { QuizHeader };
