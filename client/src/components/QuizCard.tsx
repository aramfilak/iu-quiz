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
  Heading,
  CardBody,
  Tooltip
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaList, FaEdit, FaTrash, FaPlay } from 'react-icons/fa';
import { convertToGermanDate } from '../utils/helpers';
import { Quiz } from '../utils/types';
import { routes } from '../utils/routes';
import { useNavigate } from 'react-router-dom';
import { HiMiniArrowPath } from 'react-icons/hi2';
import { MdOutlineQuiz } from 'react-icons/md';
import { AiOutlineNumber } from 'react-icons/ai';
import { TbUserHeart } from 'react-icons/tb';

interface QuizCardProps extends CardProps {
  quiz: Quiz;
}

function QuizCard({ quiz: { id, title, updatedAt, size, popularity }, ...rest }: QuizCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate();

  function handleDeleteQuiz() {}

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
              <Button colorScheme="red" onClick={handleDeleteQuiz} ml={3} type="button">
                Löschen
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/*-----------------  Quiz Card -------------------*/}
      <Card {...rest} overflow="hidden" shadow="none" align="start" justify="center" dir="column">
        <CardHeader width="100%" display="flex" justifyContent="end">
          {/*----------------- Card Options Menu -------------------*/}
          <Menu>
            <MenuButton
              bg="gray.300"
              _dark={{ color: 'white.300' }}
              as={IconButton}
              icon={<FaList />}
              size="sm"
              aria-label="Quiz Card Menü"
            />
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

          <IconButton icon={<FaPlay />} aria-label="Quiz Spielen" ml={2} size="sm" />
        </CardHeader>
        <CardBody minW="100%">
          {/*----------------- Title -------------------*/}
          <Tooltip label={title} colorScheme="green">
            <Flex align="center" gap="2">
              <Text fontSize="xl" color="gray.800" _dark={{ color: 'white' }}>
                <MdOutlineQuiz />
              </Text>
              <Heading
                fontWeight="extrabold"
                fontSize="lg"
                maxW="10rem"
                textTransform="capitalize"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                mb="0.5rem"
              >
                {title}
              </Heading>
            </Flex>
          </Tooltip>
          {/*----------------- Update Date -------------------*/}
          <Flex align="center" gap="2">
            <HiMiniArrowPath />
            <Text>Aktualisiert am {convertToGermanDate(updatedAt)}</Text>
          </Flex>
          {/*----------------- Size -------------------*/}
          <Flex align="center" gap="2">
            <AiOutlineNumber />
            <Text>Anzahl {size}</Text>
          </Flex>
          {/*----------------- Popularity -------------------*/}
          <Flex align="center" gap="2">
            <TbUserHeart />
            <Text>Beliebheit {popularity}</Text>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}

export { QuizCard };
