import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  FormErrorMessage,
  InputGroup,
  Tooltip,
  Select,
  ModalFooter,
  Button
} from '@chakra-ui/react';

import { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useStudentStore } from '../stores';

function CreateNewQuiz() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrorTitle, setTitleFormError] = useState(false);
  const [formErrorCourseOfStudy, setCourseOfStudyFormError] = useState(false);
  const [formErrorModule, setModuleFormError] = useState(false);
  const quizTitleRef = useRef<HTMLInputElement>(null);
  const courseOfStudySelectRef = useRef<HTMLSelectElement>(null);
  const moduleSelectRef = useRef<HTMLSelectElement>(null);
  const { studentProfile } = useStudentStore();
  const [selectedCourseOfStudy, setSelectedCourseOfStudy] = useState<string>(
    studentProfile?.courseOfStudy || ''
  );

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
  return (
    <>
      <Box
        width="180px"
        height="180px"
        border="2px"
        borderRadius="2xl"
        borderColor="teal.700"
        bg="white"
        _dark={{ bg: 'transparent' }}
        p={4}
        m={2}
        position="relative"
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <Box
          display="flex"
          alignItems="center"
          onClick={() => setIsModalOpen(true)}
          cursor="pointer"
        >
          <Flex direction="column" align="center" justify="center">
            <Text>{'Neues Quiz'}</Text>
            <IconButton aria-label="Add" icon={<FaPlus />} size="sm" colorScheme="teal" mt={2} />
          </Flex>
        </Box>
      </Box>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(true)} isCentered>
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
              <Button mr={3} colorScheme="teal" onClick={() => setIsModalOpen(false)}>
                Abbrechen
              </Button>
              <Button colorScheme="teal" onClick={handleAddRectangle}>
                Erstellen
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { CreateNewQuiz };
