import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import {
  FaClipboardList,
  FaEdit,
  FaFolderOpen,
  FaList,
  FaMinus,
  FaPlus,
  FaRegClone,
  FaTrash
} from 'react-icons/fa';
import { HiMiniArrowPath } from 'react-icons/hi2';
import { TbUserHeart } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../../stores/quizStore.tsx';
import { ActionType } from '../../utils/enums.ts';
import { convertToGermanDate } from '../../utils/formatters.ts';
import { routes } from '../../utils/routes.tsx';
import { Quiz } from '../../utils/types';
import { CustomAlertDialog } from '../dialogs/CustomAlertDialog.tsx';

interface QuizCardProps extends CardProps {
  quiz: Quiz;
  displayPlayButton?: boolean;
  isLoading?: boolean;
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
  isLoading,
  displayOptionMenu,
  displayPlayButton,
  displayFollowButton,
  displayUnFollowButton,
  quiz,
  ...rest
}: QuizCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setEditQuiz, setQuizFormActionType } = useQuizStore();
  const navigate = useNavigate();

  return (
    <>
      {/*----------------- Delete Alert Dialog -------------------*/}
      {displayOptionMenu && (
        <CustomAlertDialog
          isOpen={isOpen}
          onClose={onClose}
          title="Löschen bestätigen"
          description={`Möchten Sie "${quiz.title}" wirklich löschen?`}
          onSubmit={() => {
            onClose();
            displayOptionMenu.onDelete();
          }}
          submitButtonLabel="Löschen"
        />
      )}
      {/*-----------------  Quiz Card -------------------*/}
      <Card
        {...rest}
        overflow="hidden"
        shadow="base"
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
                icon={<FaPlus />}
                aria-label="Folgen"
                ml="2"
                size="sm"
                isLoading={isLoading}
              />
            </Tooltip>
          )}

          {/*----------------- UnFolow Button -------------------*/}
          {displayUnFollowButton && (
            <Tooltip label="Nicht mehr folgen">
              <IconButton
                colorScheme="red"
                onClick={displayUnFollowButton.onUnFollow}
                icon={<FaMinus />}
                aria-label="Nicht mehr folgen"
                ml="2"
                size="sm"
                isLoading={isLoading}
              />
            </Tooltip>
          )}

          {/*----------------- Play Quiz -------------------*/}
          {displayPlayButton && (
            <Tooltip label="Öffnen">
              <IconButton
                onClick={() =>
                  navigate(`../${routes.Dashboard.children.Quiz.mainPath}/${quiz.id}`)
                }
                icon={<FaFolderOpen />}
                aria-label="Quiz Öffnen"
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
          {/*----------------- Likes -------------------*/}
          <Tooltip label="Likes">
            <Flex align="center" gap="1">
              <TbUserHeart />
              <Text> {quiz.likes}</Text>
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
