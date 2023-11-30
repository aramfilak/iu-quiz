import {
  Button,
  Card,
  CardBody,
  CardBodyProps,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaGraduationCap, FaPlus, FaBook, FaBookmark } from 'react-icons/fa';
import courseOfStudies from '../data/courseOfStudy.json';
import { useQuizStore, useStudentStore } from '../stores';

interface CreateNewQuizProps extends CardBodyProps {
  onCreate: () => void;
}

interface Course {
  title: string;
  onCreate?: () => void;
}

const findCourseOfStudyCourses = (courseOfStudyName: string) => {
  return courseOfStudies.find(({ name }) => name === courseOfStudyName);
};

function CreateNewQuiz({ onCreate, ...rest }: CreateNewQuizProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const courseOfStudySelectRef = useRef<HTMLSelectElement>(null);
  const courseSelectRef = useRef<HTMLSelectElement>(null);
  const { createQuiz } = useQuizStore();
  const { studentProfile } = useStudentStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const defaultCourseOfStudy = studentProfile?.courseOfStudy || courseOfStudies[0].name;
  const [selectedCourseOfStudyCourses, setSelectedCourseOfStudyCourses] = useState<Array<Course>>(
    () => {
      const result = findCourseOfStudyCourses(defaultCourseOfStudy);
      return result ? result.courses : [];
    }
  );

  const handleSelectCourseOfStudy = (selectedCourseOfStudy: string) => {
    const courses = findCourseOfStudyCourses(selectedCourseOfStudy)?.courses;

    setSelectedCourseOfStudyCourses(courses || []);
  };

  const handleCreateNewQuiz = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleInputRef.current?.value;
    const courseOfStudy = courseOfStudySelectRef.current?.value;
    const course = courseSelectRef.current?.value;

    if (title && courseOfStudy && course) {
      const response = new Promise((resolve, reject) => {
        createQuiz(title, courseOfStudy, course).then(({ success }) => {
          if (success) {
            resolve(true);
            onCreate();
          } else {
            reject();
          }
        });
      });

      toast.promise(response, {
        success: { description: 'Neues Quiz erstellt' },
        error: { description: 'Erstellung fehlgeschlagen' },
        loading: { description: 'Es lädt..' }
      });

      onClose();
    } else {
      toast({
        description: 'Bitte alle Felder ausfüllen',
        status: 'warning'
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <form onSubmit={handleCreateNewQuiz}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Neues Quiz erstellen</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb="6" display="flex" flexDir="column" gap="4">
              {/*____________________ Quiz Title ____________________*/}
              <InputGroup>
                <Tooltip label="Title">
                  <InputLeftAddon>
                    <FaBookmark />
                  </InputLeftAddon>
                </Tooltip>
                <FormControl>
                  <Input
                    borderTopLeftRadius="0"
                    borderBottomLeftRadius="0"
                    borderColor="teal.500"
                    ref={titleInputRef}
                    placeholder="Quiz Title"
                    variant="filled"
                  />
                </FormControl>
              </InputGroup>

              {/*------------------- Course Of Study --------------------*/}
              <InputGroup>
                <Tooltip label="Studiengang">
                  <InputLeftAddon>
                    <FaGraduationCap />
                  </InputLeftAddon>
                </Tooltip>
                <Select ref={courseOfStudySelectRef} defaultValue={defaultCourseOfStudy}>
                  {courseOfStudies.map(({ name }) => (
                    <option key={name} value={name} onClick={() => handleSelectCourseOfStudy(name)}>
                      {name}
                    </option>
                  ))}
                </Select>
              </InputGroup>

              {/*------------------- Course  --------------------*/}
              <InputGroup>
                <Tooltip label="Module">
                  <InputLeftAddon>
                    <FaBook />
                  </InputLeftAddon>
                </Tooltip>
                <Select ref={courseSelectRef}>
                  {selectedCourseOfStudyCourses.map(({ title }) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </ModalBody>
            {/*____________________ Course Of Study ____________________*/}

            <ModalFooter>
              <Button mr="3" colorScheme="gray" onClick={onClose}>
                Abbrechen
              </Button>
              <Button type="submit">Speichern</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      {/*____________________ Create New Quiz Card ____________________*/}
      <Card {...rest}>
        <CardBody
          onClick={onOpen}
          borderRadius="md"
          w="full"
          h="full"
          boxShadow="none"
          border="2px dashed"
          borderColor="gray.400"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="xl"
          gap="2"
          color="gray.400"
          transition="all 0.2s ease"
          fontWeight="600"
          _hover={{ color: 'gray.500', borderColor: 'gray.500' }}
          _dark={{
            color: 'gray.500',
            borderColor: 'gray.500',
            _hover: { color: 'gray.400', borderColor: 'gray.400' }
          }}
        >
          <FaPlus />
          Neues Quiz
        </CardBody>
      </Card>
    </>
  );
}

export { CreateNewQuiz };
