import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  Tooltip,
  InputLeftAddon,
  FormControl,
  Input,
  Select,
  ModalFooter,
  Button,
  UseDisclosureProps,
  useToast
} from '@chakra-ui/react';
import { FaBookmark, FaGraduationCap, FaBook } from 'react-icons/fa';
import { useRef, useState } from 'react';
import courseOfStudies from '../data/courseOfStudy.json';
import { useQuizStore } from '../stores';

interface Course {
  title: string;
}

const findCourses = (courseOfStudy: string): Course[] => {
  return courseOfStudies.find(({ name }) => name === courseOfStudy)?.courses || [];
};

interface CreateQuizFormProps extends UseDisclosureProps {
  defaultCourseOfStudy: string;
  isOpen: boolean;
  onClose: () => void;
  onFinal: () => void;
}

function CreateQuizForm({
  defaultCourseOfStudy,
  isOpen,
  onClose,
  onFinal
}: CreateQuizFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const courseOfStudySelectRef = useRef<HTMLSelectElement>(null);
  const courseSelectRef = useRef<HTMLSelectElement>(null);
  const { createQuiz } = useQuizStore();
  const toast = useToast();
  const [courses, setCourses] = useState<Course[]>(findCourses(defaultCourseOfStudy));

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleInputRef.current?.value;
    const courseOfStudy = courseOfStudySelectRef.current?.value;
    const course = courseSelectRef.current?.value;

    if (!title || !courseOfStudy || !course) {
      return toast({
        description: 'Bitte alle Felder ausfüllen',
        status: 'warning'
      });
    }

    if (title.length < 3 || title.length > 50) {
      return toast({
        description: 'Title muss zwischen 3 und 50 Zeichen lang sein.',
        status: 'warning'
      });
    }

    const response = new Promise((resolve, reject) =>
      createQuiz(title, courseOfStudy, course)
        .then(() => {
          resolve(onClose());
        })
        .catch(() => reject())
        .finally(() => onFinal())
    );

    toast.promise(response, {
      success: { description: 'Neues Quiz erstellt' },
      error: { description: 'Erstellung fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <form onSubmit={handleFormSubmit}>
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
                  <option
                    key={name}
                    value={name}
                    onClick={() => setCourses(findCourses(name))}
                  >
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
                {courses &&
                  courses.map(({ title }) => (
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
  );
}

export { CreateQuizForm };
