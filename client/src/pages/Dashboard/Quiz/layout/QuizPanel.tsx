import {
  Avatar,
  BoxProps,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { HiPlay } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { BoxWrapper, PlayQuiz } from '../../../../components';
import { useQuizStore, useStudentStore } from '../../../../stores';
import { convertToGermanDate } from '../../../../utils/formatters';
import { routes } from '../../../../utils/routes';
import { Quiz } from '../../../../utils/types';

interface QuizPanelProps extends BoxProps {
  quiz: Quiz;
  onChange: () => Promise<void>;
}

function QuizPanel({ quiz, onChange, ...rest }: QuizPanelProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const toggleLikeQuiz = useQuizStore((state) => state.toggleLikeQuiz);
  const studentProfile = useStudentStore((state) => state.studentProfile);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isLiked = quiz.likedBy.find(
    (player) => player.playerId === studentProfile?.studentId
  );

  const handleLikeQuiz = () => {
    setIsLoading(true);
    toggleLikeQuiz(quiz.id)
      .then(() => onChange().finally(() => setIsLoading(false)))
      .catch(() => {
        toast({ status: 'error', description: 'Like fehlgeschlagen' });
        setIsLoading(false);
      });
  };

  return (
    <>
      <PlayQuiz isOpen={isOpen} onClose={onClose} quiz={quiz} />
      <BoxWrapper title="Informationen" {...rest}>
        <TableContainer>
          <Table size="sm">
            <Tbody>
              <Tr>
                <Td fontWeight="bold">
                  <Avatar
                    borderRadius="md"
                    src={quiz.student.studentProfile?.profileImage?.url}
                  />
                </Td>
                <Td>
                  <Button
                    variant="link"
                    fontWeight="bold"
                    onClick={() =>
                      navigate(
                        `../${routes.Dashboard.children.Profile.mainPath}/${quiz.authorId}`
                      )
                    }
                  >
                    {quiz.student.studentProfile?.name}
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Title</Td>
                <Td>{quiz.title}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Anzahl</Td>
                <Td>{quiz.size}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Letztes Update</Td>
                <Td>{convertToGermanDate(quiz.updatedAt)}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Studiengang</Td>
                <Td>{quiz.courseOfStudy}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Module</Td>
                <Td>{quiz.course}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Likes</Td>
                <Td>{quiz.likes}</Td>
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

          <Button
            alignSelf="end"
            colorScheme="teal"
            leftIcon={<HiPlay />}
            onClick={onOpen}
          >
            Spielen
          </Button>
        </HStack>
      </BoxWrapper>
    </>
  );
}

export { QuizPanel };
