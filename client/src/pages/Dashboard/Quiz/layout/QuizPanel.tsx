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
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { HiPlay } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { BoxWrapper } from '../../../../components';
import { useQuizStore, useStudentStore } from '../../../../stores';
import { convertToGermanDate } from '../../../../utils/formatters';
import { routes } from '../../../../utils/routes';

interface QuizPanelProps extends BoxProps {
  onChange: () => Promise<void>;
}

function QuizPanel({ onChange, ...rest }: QuizPanelProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const toggleLikeQuiz = useQuizStore((state) => state.toggleLikeQuiz);
  const activeQuiz = useQuizStore((state) => state.activeQuiz);
  const studentProfile = useStudentStore((state) => state.studentProfile);
  const [isLoading, setIsLoading] = useState(false);
  const isLiked =
    activeQuiz &&
    activeQuiz.likedBy.find((player) => player.playerId === studentProfile?.studentId);

  if (!activeQuiz) return null;

  const handleLikeQuiz = () => {
    setIsLoading(true);
    toggleLikeQuiz(activeQuiz.id)
      .then(() => onChange().finally(() => setIsLoading(false)))
      .catch(() => {
        toast({ status: 'error', description: 'Like fehlgeschlagen' });
        setIsLoading(false);
      });
  };

  return (
    <>
      <BoxWrapper title="Informationen" {...rest} justifyContent="space-between">
        <TableContainer>
          <Table size="sm">
            <Tbody>
              <Tr>
                <Td fontWeight="bold">Gestalter</Td>
                <Td>
                  <Button
                    variant="link"
                    fontWeight="bold"
                    onClick={() =>
                      navigate(
                        `../${routes.Dashboard.children.Profile.mainPath}/${activeQuiz.authorId}`
                      )
                    }
                  >
                    <Avatar
                      borderRadius="md"
                      src={activeQuiz.student.studentProfile?.profileImage?.url}
                      mr="2"
                    />
                    {activeQuiz.student.studentProfile?.name}
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Titel</Td>
                <Td>{activeQuiz.title}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Anzahl</Td>
                <Td>{activeQuiz.size}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Letztes Update</Td>
                <Td>{convertToGermanDate(activeQuiz.updatedAt)}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Studiengang</Td>
                <Td>{activeQuiz.courseOfStudy}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Module</Td>
                <Td>{activeQuiz.course}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Likes</Td>
                <Td>{activeQuiz.likes}</Td>
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
            onClick={() => {
              if (activeQuiz.size > 0) {
                navigate(`../${routes.Dashboard.children.GamePlay.path}`);
              } else {
                toast({ status: 'warning', description: 'Quiz hat keine Fragen' });
              }
            }}
          >
            Spielen
          </Button>
        </HStack>
      </BoxWrapper>
    </>
  );
}

export { QuizPanel };
