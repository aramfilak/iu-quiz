import { useState, ReactNode, useEffect } from 'react';
import {
  Box,
  IconButton,
  Flex,
  Text,
  ChakraProvider,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  MenuItem,
  InputGroup,
  Select,
  Tooltip,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Skeleton
} from '@chakra-ui/react';
import { FaPlus, FaEdit, FaTrash, FaList, FaUserEdit, FaBuilding } from 'react-icons/fa';
import { PageHeader } from '../../../components';
import { useRef } from 'react';
import { useStudentStore } from '../../../stores';
import { useQuizStore } from '../../../stores';
import courseOfStudy from '../../../data/courseOfStudy.json';
import { CustomAlert } from '../../../utils/types';
import { useNavigate } from 'react-router-dom';

const Rectangle = ({
  title,
  createdDate,
  modifiedDate,
  onEdit,
  onDelete
}: {
  title: ReactNode;
  createdDate: Date;
  modifiedDate: Date;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const leastDestructiveRef = useRef(null);

  const onCloseDeleteAlert = () => setIsDeleteAlertOpen(false);
  const onDeleteButtonClick = () => setIsDeleteAlertOpen(true);

  const handleDeleteConfirmed = () => {
    onDelete();
    onCloseDeleteAlert();
  };

  return (
    <Box
      width="180px"
      height="180px"
      border="1px"
      borderRadius="2xl"
      borderColor="teal.700"
      p={4}
      m={2}
      position="relative"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <Text fontWeight="bold">{title}</Text>
      <Flex position="absolute" bottom={2}>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Flex direction="row" justifyContent="center" alignItems="center">
            <FaBuilding></FaBuilding>
            <Text ml="5px">
              {new Date(createdDate).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </Flex>
          <Flex direction="row" justifyContent="center" alignItems="center">
            <FaUserEdit></FaUserEdit>
            <Text ml="5px">
              {new Date(modifiedDate).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex position="absolute" top={2} right={2}>
        <Menu>
          <MenuButton as={IconButton} icon={<FaList />} size="sm" mr={2} aria-label="Menu" />
          <MenuList>
            <MenuItem onClick={onEdit} icon={<FaEdit />} aria-label="Edit">
              Bearbeiten
            </MenuItem>
            <MenuItem onClick={onDeleteButtonClick} icon={<FaTrash />} aria-label="Delete">
              Löschen
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* AlertDialog für Löschen */}
      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isDeleteAlertOpen}
        onClose={onCloseDeleteAlert}
        leastDestructiveRef={leastDestructiveRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Löschen bestätigen</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>Möchten Sie "{title}" wirklich löschen?</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="teal" onClick={onCloseDeleteAlert}>
                Abbrechen
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirmed} ml={3} type="button">
                Löschen
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

function MeineQuiz() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrorTitle, setTitleFormError] = useState(false);
  const [formErrorCourseOfStudy, setCourseOfStudyFormError] = useState(false);
  const [formErrorModule, setModuleFormError] = useState(false);
  const quizTitleRef = useRef<HTMLInputElement>(null);
  const courseOfStudySelectRef = useRef<HTMLSelectElement>(null);
  const moduleSelectRef = useRef<HTMLSelectElement>(null);
  const { quizzes, getAllQuizzes } = useQuizStore();
  const { studentProfile } = useStudentStore();
  const [selectedCourseOfStudy, setSelectedCourseOfStudy] = useState<string>(
    studentProfile?.courseOfStudy || ''
  );
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const [loading, setLoadingState] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRectangle = () => {
    if (!quizTitleRef.current?.value) {
      setTitleFormError(true);
      return;
    }
    setTitleFormError(false);
    if (!courseOfStudySelectRef.current?.value) {
      setCourseOfStudyFormError(true);
      return;
    }
    setCourseOfStudyFormError(false);
    if (!moduleSelectRef.current?.value) {
      setModuleFormError(true);
      return;
    }
    setModuleFormError(false);

    handleCreateQuiz();
    handleCloseModal();
  };

  const handleCreateQuiz = async () => {
    setAlert({ status: 'loading', message: 'Es lädt...' });
    const { success, message } = await useQuizStore
      .getState()
      .createQuiz(
        quizTitleRef.current?.value as string,
        courseOfStudySelectRef.current?.value as string,
        moduleSelectRef.current?.value as string
      );

    setAlert({ status: success ? 'success' : 'error', message: message });
  };

  const handleEditRectangle = (quizId: number) => {
    navigate(`/editor/${quizId}`);
  };

  const handleDeleteRectangle = async (quizId: number) => {
    setAlert({ status: 'loading', message: 'Es lädt...' });
    const { success, message } = await useQuizStore.getState().deleteQuizById(quizId);
    setAlert({ status: success ? 'success' : 'error', message: message });
  };

  const handelChange = () => {
    if (!quizTitleRef.current?.value) {
      setTitleFormError(true);
      return;
    }
    setTitleFormError(false);
    if (!courseOfStudySelectRef.current?.value) {
      setCourseOfStudyFormError(true);
      return;
    }
    setCourseOfStudyFormError(false);
    if (!moduleSelectRef.current?.value) {
      setModuleFormError(true);
      return;
    }
    setModuleFormError(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setAlert({ status: 'loading', message: 'Es lädt...' });
      const response = await getAllQuizzes();
      setLoadingState(false);
      setAlert({ status: response.success ? 'success' : 'error', message: response.message });
    };

    fetchData();
  }, [getAllQuizzes]);

  return (
    <>
      {/*------------------- Alert  --------------------*/}
      {alert && (
        <Alert status={alert.status} mb="4">
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
      <Box mx="auto" maxW="800px" mb="4">
        <PageHeader
          title={'Meine Quiz'}
          description="Dein Wissen. Deine Quiz. Alles im Überblick."
        />
        <ChakraProvider>
          <Skeleton isLoaded={!loading}>
            <Flex direction="row" align="center" justify="center" flexWrap="wrap">
              {quizzes?.map((quiz, index) => (
                <Rectangle
                  key={index}
                  title={quiz?.title}
                  createdDate={quiz?.createdAt}
                  modifiedDate={quiz?.updatedAt}
                  onEdit={() => handleEditRectangle(quiz?.id)}
                  onDelete={() => handleDeleteRectangle(quiz?.id)}
                />
              ))}
              <Box
                width="180px"
                height="180px"
                border="1px"
                borderRadius="2xl"
                borderColor="teal.700"
                p={4}
                m={2}
                position="relative"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Box display="flex" alignItems="center" onClick={handleOpenModal} cursor="pointer">
                  <Flex direction="column" align="center" justify="center">
                    <Text>{'Neues Quiz'}</Text>
                    <IconButton
                      aria-label="Add"
                      icon={<FaPlus />}
                      size="sm"
                      colorScheme="teal"
                      mt={2}
                    />
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Skeleton>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Neues Quiz erstellen</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired isInvalid={formErrorTitle} mb={3}>
                  <Input ref={quizTitleRef} onChange={handelChange} placeholder="Quiz-Titel" />
                  <FormErrorMessage>Dies ist ein Pflichtfeld</FormErrorMessage>
                </FormControl>
                {/*------------------- Course Of Study --------------------*/}
                <FormControl isRequired isInvalid={formErrorCourseOfStudy} mb={3}>
                  <InputGroup>
                    <Tooltip label="Studiengang">
                      <Select
                        ref={courseOfStudySelectRef}
                        onChange={(e) => {
                          handelChange();
                          setSelectedCourseOfStudy(e.target.value);
                        }}
                        defaultValue={studentProfile?.courseOfStudy || ''}
                      >
                        <option value="" disabled hidden>
                          Studiengang auswählen
                        </option>
                        {courseOfStudy.map(({ name }) => (
                          <option value={name} key={name}>
                            {name}
                          </option>
                        ))}
                      </Select>
                    </Tooltip>
                  </InputGroup>
                  <FormErrorMessage>Dies ist ein Pflichtfeld</FormErrorMessage>
                </FormControl>
                {/*------------------- Course --------------------*/}
                <FormControl isRequired isInvalid={formErrorModule} mb={3}>
                  <InputGroup>
                    <Tooltip label="Modul">
                      <Select onChange={handelChange} ref={moduleSelectRef}>
                        <option value="" disabled hidden>
                          Modul auswählen
                        </option>
                        {courseOfStudy
                          ?.find(({ name }) => name === selectedCourseOfStudy)
                          ?.courses?.map(({ title, shortcode }) => (
                            <option key={shortcode} value={shortcode}>
                              {title}
                            </option>
                          )) || []}
                      </Select>
                    </Tooltip>
                  </InputGroup>
                  <FormErrorMessage>Dies ist ein Pflichtfeld</FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Flex justifyContent="flex-end">
                  <Button mr={3} colorScheme="teal" onClick={handleCloseModal}>
                    Abbrechen
                  </Button>
                  <Button colorScheme="teal" onClick={handleAddRectangle}>
                    Erstellen
                  </Button>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ChakraProvider>
      </Box>
    </>
  );
}

export { MeineQuiz };
