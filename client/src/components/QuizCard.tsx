import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  Card,
  CardProps,
  CardHeader,
  CardBody,
  Tooltip,
  CardFooter
} from '@chakra-ui/react';
import {
  FaList,
  FaTrash,
  FaPlay,
  FaRegClone,
  FaHeart,
  FaHeartBroken,
  FaClipboardList,
  FaEdit
} from 'react-icons/fa';
import { useRef } from 'react';
import { convertToGermanDate } from '../utils/formatters.ts';
import { Quiz } from '../utils/types';
import { routes } from '../utils/routes';
import { useNavigate } from 'react-router-dom';
import { HiMiniArrowPath } from 'react-icons/hi2';
import { TbUserHeart } from 'react-icons/tb';
import { useQuizStore } from '../stores/quizStore.tsx';
import { ActionType } from '../utils/enums.ts';

interface QuizCardProps extends CardProps {
  quiz: Quiz;
  displayPlayButton?: boolean;
  displayOptionMenu?: {
    onDelete: () => void;
    onEdit: () => void;
  };
  displayFollowButton?: {
    onFollow: () => void;
  };
  displayUnFollowButton?: {
    onUnFollow: () => void;
  };
}

function QuizCard({
  displayOptionMenu,
  displayPlayButton,
  displayFollowButton,
  displayUnFollowButton,
  quiz,
  ...rest
}: QuizCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setEditQuiz, setQuizFormActionType } = useQuizStore();
  const cancelRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      {/*----------------- Delete Alert Dialog -------------------*/}
      {displayOptionMenu && (
        <AlertDialog
          motionPreset="slideInBottom"
          isOpen={isOpen}
          onClose={onClose}
          leastDestructiveRef={cancelRef}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Löschen bestätigen</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Möchten Sie "{quiz.title}" wirklich löschen?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="teal" onClick={onClose}>
                  Abbrechen
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    onClose();
                    displayOptionMenu.onDelete();
                  }}
                  ml={3}
                  type="button"
                >
                  Löschen
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
      {/*-----------------  Quiz Card -------------------*/}
      <Card
        {...rest}
        overflow="hidden"
        shadow="none"
        align="start"
        justify="center"
        dir="column"
      >
        <CardHeader width="full" display="flex" justifyContent="end">
          {/*----------------- Quiz Size -------------------*/}
          <Tooltip label="Anzahl" margin="right">
            <Flex marginRight="auto" align="center" gap="1">
              <FaRegClone />
              <Text>{quiz.size}</Text>
            </Flex>
          </Tooltip>

          {/*----------------- Card Options Menu -------------------*/}
          {displayOptionMenu && (
            <Menu>
              <Tooltip label="Optionen">
                <MenuButton
                  bg="gray.300"
                  _dark={{ color: 'white.300' }}
                  as={IconButton}
                  icon={<FaList />}
                  size="sm"
                  aria-label="Quiz Card Menü"
                />
              </Tooltip>
              <MenuList>
                {/*----------------- Update Quiz-------------------*/}
                <MenuItem
                  _dark={{ textColor: 'white' }}
                  onClick={() => {
                    setEditQuiz(quiz);
                    setQuizFormActionType(ActionType.UPDATE);
                    displayOptionMenu.onEdit();
                  }}
                  icon={<FaEdit />}
                  aria-label="Edit Questions"
                >
                  Daten aktualisieren
                </MenuItem>
                {/*----------------- Update Questions-------------------*/}
                <MenuItem
                  onClick={() =>
                    navigate(
                      `../${routes.Dashboard.children.QuestionsEditor.mainPath}/${quiz.id}`
                    )
                  }
                  _dark={{ textColor: 'white' }}
                  icon={<FaClipboardList />}
                  aria-label="Edit Questions"
                >
                  Fragen bearbeiten
                </MenuItem>
                {/*----------------- Delete Quiz -------------------*/}
                <MenuItem
                  _dark={{ textColor: 'red.300' }}
                  textColor="red.500"
                  onClick={onOpen}
                  icon={<FaTrash />}
                  aria-label="Delete"
                >
                  Löschen
                </MenuItem>
              </MenuList>
            </Menu>
          )}

          {/*----------------- Follow Button -------------------*/}
          {displayFollowButton && (
            <Tooltip label="Folgen">
              <IconButton
                onClick={displayFollowButton.onFollow}
                icon={<FaHeart />}
                aria-label="Folgen"
                ml="2"
                size="sm"
              />
            </Tooltip>
          )}

          {/*----------------- UnFolow Button -------------------*/}
          {displayUnFollowButton && (
            <Tooltip label="Nicht mehr folgen">
              <IconButton
                colorScheme="red"
                onClick={displayUnFollowButton.onUnFollow}
                icon={<FaHeartBroken />}
                aria-label="Nicht mehr folgen"
                ml="2"
                size="sm"
              />
            </Tooltip>
          )}

          {/*----------------- Play Quiz -------------------*/}
          {displayPlayButton && (
            <Tooltip label="Spielen">
              <IconButton
                onClick={() =>
                  navigate(`../${routes.Dashboard.children.PlayQuiz.mainPath}/${quiz.id}`)
                }
                icon={<FaPlay />}
                aria-label="Quiz Spielen"
                ml="2"
                size="sm"
              />
            </Tooltip>
          )}
        </CardHeader>
        <CardBody minW="full">
          {/*----------------- Title -------------------*/}
          <Text fontWeight="bold" textAlign="center">
            {quiz.title}
          </Text>
        </CardBody>

        <CardFooter
          minW="full"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {/*----------------- Popularity -------------------*/}
          <Tooltip label="Beliebtheit">
            <Flex align="center" gap="1">
              <TbUserHeart />
              <Text> {quiz.popularity}</Text>
            </Flex>
          </Tooltip>
          {/*----------------- Update Date -------------------*/}
          <Tooltip label="Letztes Update">
            <Flex align="center" gap="1">
              <HiMiniArrowPath />
              <Text> {convertToGermanDate(quiz.updatedAt)}</Text>
            </Flex>
          </Tooltip>
        </CardFooter>
      </Card>
    </>
  );
}

export { QuizCard };
