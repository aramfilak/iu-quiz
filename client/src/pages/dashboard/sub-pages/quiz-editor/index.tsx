import {
  InputGroup,
  Input,
  Select,
  InputLeftAddon,
  Tooltip,
  Box,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useStudentStore } from '../../../../sotres';
import courseOfStudy from '../../../../data/courseOfStudy.json';
import { FaEdit, FaBook, FaGraduationCap } from 'react-icons/fa';
import { PageHeader } from '../../../../components';

function QuizEditor() {
  const courseOfStudySelectRef = useRef<HTMLSelectElement>(null);
  const moduleSelectRef = useRef<HTMLSelectElement>(null);
  const { studentProfile } = useStudentStore();
  const [selectedCourseOfStudy, setSelectedCourseOfStudy] = useState<string>(
    studentProfile?.courseOfStudy || ''
  );

  const handelChange = () => {
    setSelectedCourseOfStudy(courseOfStudySelectRef.current?.value || '');
  };

  return (
    <Box>
      <PageHeader title={'Quiz - Editor'} description="Erstelle dein eigenes Quiz" />
      <VStack spacing="1rem" align="center" mx={{ base: '1rem', lg: '0' }}>
        {/*------------------- Quiz title --------------------*/}
        <InputGroup w="100%" bg={useColorModeValue('white', 'gray.800')}>
          <Tooltip label="Quiz Titel">
            <InputLeftAddon borderColor="teal.700" bg={useColorModeValue('white', 'gray.800')}>
              <FaEdit />
            </InputLeftAddon>
          </Tooltip>
          <Input
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            borderColor="teal.700"
            autoComplete="on"
            id="nick-name"
            placeholder="Quiz - Titel"
          />
        </InputGroup>

        {/*------------------- Course Of Study --------------------*/}
        <InputGroup w="100%" bg={useColorModeValue('white', 'gray.800')}>
          <Tooltip label="Studiengang">
            <InputLeftAddon borderColor="teal.700" bg={useColorModeValue('white', 'gray.800')}>
              <FaGraduationCap />
            </InputLeftAddon>
          </Tooltip>
          <Select
            onChange={handelChange}
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            ref={courseOfStudySelectRef}
            defaultValue={studentProfile?.courseOfStudy || ''}
            bg={useColorModeValue('white', 'gray.800')}
            borderColor="teal.700"
            borderWidth="1px"
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
        </InputGroup>

        {/*------------------- Course --------------------*/}
        <InputGroup w="100%" bg={useColorModeValue('white', 'gray.800')}>
          <Tooltip label="Modul">
            <InputLeftAddon borderColor="teal.700" bg={useColorModeValue('white', 'gray.800')}>
              <FaBook />
            </InputLeftAddon>
          </Tooltip>
          <Select
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            ref={moduleSelectRef}
            defaultValue={''}
            bg={useColorModeValue('white', 'gray.800')}
            borderColor="teal.700"
            borderWidth="1px"
          >
            <option value="" disabled hidden>
              Modul auswählen
            </option>
            {courseOfStudy
              ?.find(({ name }) => name === selectedCourseOfStudy)
              ?.courses?.map(({ title, shortcode }) => (
                <option key={shortcode} value={title}>
                  {title}
                </option>
              )) || []}
          </Select>
        </InputGroup>
      </VStack>
    </Box>
  );
}

export { QuizEditor };
