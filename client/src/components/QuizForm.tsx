import {
  Button,
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
  UseDisclosureProps,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaBook, FaBookmark, FaGraduationCap } from 'react-icons/fa';
import courseOfStudies from '../data/courseOfStudy.json';
import { useQuizStore, useStudentStore } from '../stores';
import { ActionType } from '../utils/enums';
import { parseJsonDataFromFormData } from '../utils/helpers';

interface Course {
  name: string;
}

interface FormType {
  title: string;
  courseOfStudy: string;
  course: string;
}

interface QuizFormProps extends UseDisclosureProps {
  isOpen: boolean;
  onClose: () => void;
  onFinal: () => void;
}

function QuizForm({ isOpen, onClose, onFinal }: QuizFormProps) {
  const { editQuiz, quizFormActionType, createQuiz, updateQuiz } = useQuizStore();
  const { studentProfile } = useStudentStore();
  const [isLoading, setIsLoading] = useState(false);
  const isUpdating = quizFormActionType === ActionType.UPDATE;
  const isCreating = quizFormActionType === ActionType.CREATE;
  const defaultCourseOfStudy = isUpdating
    ? editQuiz?.courseOfStudy
    : studentProfile?.courseOfStudy || courseOfStudies[0].name;
  const [courses, setCourses] = useState<Course[]>([]);
  const toast = useToast();

  const handleUpdateCourses = (courseName: string) => {
    const courseOfStudy = courseOfStudies.find(({ name }) => name === courseName);
    setCourses(courseOfStudy?.courses || []);
  };

  useEffect(() => {
    if (isUpdating && editQuiz) {
      handleUpdateCourses(editQuiz?.courseOfStudy);
    } else {
      handleUpdateCourses(studentProfile?.courseOfStudy || courseOfStudies[0].name);
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, courseOfStudy, course } = parseJsonDataFromFormData<FormType>(e);

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

    if (isCreating) {
      setIsLoading(true);

      createQuiz(title, courseOfStudy, course)
        .then(() => onClose())
        .catch(() =>
          toast({ status: 'error', description: 'Erstellung fehlgeschlagen"' })
        )
        .finally(() => {
          onFinal();
          setIsLoading(false);
        });
    } else if (isUpdating && editQuiz) {
      setIsLoading(true);

      updateQuiz(editQuiz?.id, title, courseOfStudy, course)
        .then(() => onClose())
        .catch(() =>
          toast({
            status: 'error',
            description: 'Aktualisierung fehlgeschlagen"'
          })
        )
        .finally(() => {
          onFinal();
          setIsLoading(false);
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
              <Tooltip label="Titel">
                <InputLeftAddon>
                  <FaBookmark />
                </InputLeftAddon>
              </Tooltip>
              <FormControl>
                <Input
                  name="title"
                  defaultValue={isUpdating ? editQuiz?.title : undefined}
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="teal.500"
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
                name="courseOfStudy"
                onChange={(e) => handleUpdateCourses(e.target.value)}
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
                name="course"
                defaultValue={isUpdating ? editQuiz?.course : undefined}
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
              {isUpdating ? 'Aktualisieren' : 'Erstellen'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export { QuizForm };
