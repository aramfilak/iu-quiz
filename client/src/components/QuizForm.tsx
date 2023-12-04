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
import { useEffect, useRef, useState } from 'react';
import { useQuizStore, useStudentStore } from '../stores';
import { ActionType } from '../utils/enums';
import courseOfStudies from '../data/courseOfStudy.json';

interface Course {
  name: string;
}

interface QuizFormProps extends UseDisclosureProps {
  isOpen: boolean;
  onClose: () => void;
  onFinal: () => void;
}

function QuizForm({ isOpen, onClose, onFinal }: QuizFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const courseOfStudySelectRef = useRef<HTMLSelectElement>(null);
  const courseSelectRef = useRef<HTMLSelectElement>(null);
  const { editQuiz, quizFormActionType, createQuiz, updateQuiz } = useQuizStore();
  const { studentProfile } = useStudentStore();
  const [isLoading, setIsLoading] = useState(false);
  const isUpdate = quizFormActionType === ActionType.UPDATE;
  const defaultCourseOfStudy = isUpdate
    ? editQuiz?.courseOfStudy
    : studentProfile?.courseOfStudy || courseOfStudies[0].name;
  const [courses, setCourses] = useState<Course[]>([]);
  const toast = useToast();

  const handleUpdateCourses = (courseName: string) => {
    const courseOfStudy = courseOfStudies.find(({ name }) => name === courseName);
    setCourses(courseOfStudy?.courses || []);
  };

  useEffect(() => {
    if (isUpdate && editQuiz) {
      handleUpdateCourses(editQuiz?.courseOfStudy);
    } else {
      handleUpdateCourses(studentProfile?.courseOfStudy || courseOfStudies[0].name);
    }
  }, []);

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

    if (quizFormActionType === ActionType.CREATE) {
      setIsLoading(true);
      const response = new Promise((resolve, reject) =>
        createQuiz(title, courseOfStudy, course)
          .then(() => {
            resolve(onClose());
          })
          .catch(() => reject())
          .finally(() => {
            onFinal();
            setIsLoading(false);
          })
      );

      toast.promise(response, {
        success: { description: 'Neues Quiz erstellt' },
        error: { description: 'Erstellung fehlgeschlagen' },
        loading: { description: 'Es lädt..' }
      });
    } else if (quizFormActionType === ActionType.UPDATE && editQuiz) {
      setIsLoading(true);
      const response = new Promise((resolve, reject) =>
        updateQuiz(editQuiz?.id, title, courseOfStudy, course)
          .then(() => {
            resolve(onClose());
          })
          .catch(() => reject())
          .finally(() => {
            onFinal();
            setIsLoading(false);
          })
      );

      toast.promise(response, {
        success: { description: 'Quiz aktualisiert' },
        error: { description: 'Aktualisierung fehlgeschlagen' },
        loading: { description: 'Es lädt..' }
      });
    }
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
                  defaultValue={isUpdate ? editQuiz?.title : undefined}
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
              <Select
                onChange={(e) => handleUpdateCourses(e.target.value)}
                ref={courseOfStudySelectRef}
                defaultValue={defaultCourseOfStudy}
              >
                {courseOfStudies.map(({ name }) => (
                  <option key={name} value={name}>
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
              <Select
                ref={courseSelectRef}
                defaultValue={isUpdate ? editQuiz?.course : undefined}
              >
                {courses.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
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
            <Button type="submit" isLoading={isLoading}>
              {isUpdate ? 'Aktualisieren' : 'Erstellen'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export { QuizForm };
