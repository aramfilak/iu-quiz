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
import { useRef } from 'react';
import { FaList, FaEdit, FaTrash, FaPlay } from 'react-icons/fa';
import { convertToGermanDate } from '../utils/helpers';
import { Quiz } from '../utils/types';
import { routes } from '../utils/routes';
import { useNavigate } from 'react-router-dom';
import { HiMiniArrowPath } from 'react-icons/hi2';
import { TbUserHeart } from 'react-icons/tb';

interface QuizCardProps extends CardProps {
  quiz: Quiz;
  onDelete: () => void;
}

function QuizCard({
  onDelete,
  quiz: { id, title, updatedAt, size, popularity },
  ...rest
}: QuizCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      {/*----------------- Delete Alert Dialog -------------------*/}
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
            <AlertDialogBody>Möchten Sie "{title}" wirklich löschen?</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="teal" onClick={onClose}>
                Abbrechen
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onDelete();
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

      {/*-----------------  Quiz Card -------------------*/}
      <Card {...rest} overflow="hidden" shadow="none" align="start" justify="center" dir="column">
        <CardHeader width="full" display="flex" justifyContent="end">
          {/*----------------- Quiz Size -------------------*/}
          <Tooltip label="Anzahl" margin="right">
            <Text fontSize="lg" fontWeight="bold" marginRight="auto">
              #{size}
            </Text>
          </Tooltip>

          {/*----------------- Card Options Menu -------------------*/}
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
              <MenuItem
                _dark={{ textColor: 'white' }}
                onClick={() => navigate(`${routes.Dashboard.children.QuizEditor.mainPath}/${id}`)}
                icon={<FaEdit />}
                aria-label="Edit"
              >
                Bearbeiten
              </MenuItem>
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
          {/*----------------- Play Quiz -------------------*/}
          <Tooltip label="Spielen">
            <IconButton icon={<FaPlay />} aria-label="Quiz Spielen" ml={2} size="sm" />
          </Tooltip>
        </CardHeader>

        <CardBody minW="full">
          {/*----------------- Title -------------------*/}
          <Tooltip label={title}>
            <Flex align="start" flexDir="column" gap="1">
              <Text
                fontWeight="bold"
                fontSize="xl"
                maxW="12rem"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                mb="0.5rem"
              >
                {title}
              </Text>
            </Flex>
          </Tooltip>
        </CardBody>

        <CardFooter minW="full" display="flex" alignItems="center" justifyContent="space-between">
          {/*----------------- Popularity -------------------*/}
          <Tooltip label="Beliebtheit">
            <Flex align="center" gap="1">
              <TbUserHeart />
              <Text> {popularity}</Text>
            </Flex>
          </Tooltip>
          {/*----------------- Update Date -------------------*/}
          <Tooltip label="Letztes Update">
            <Flex align="center" gap="1">
              <HiMiniArrowPath />
              <Text> {convertToGermanDate(updatedAt)}</Text>
            </Flex>
          </Tooltip>
        </CardFooter>
      </Card>
    </>
  );
}

export { QuizCard };
