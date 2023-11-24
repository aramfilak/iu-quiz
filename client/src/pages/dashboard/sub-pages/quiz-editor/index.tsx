import { InputGroup, Input, Select, InputLeftAddon, Tooltip, Flex } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useStudentStore } from '../../../../sotres';
import courseOfStudy from '../../../../data/courseOfStudy.json';
import { FaEdit, FaBook, FaGraduationCap } from 'react-icons/fa';
import { BoxWrapper, PageHeader } from '../../../../components';

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
    <>
      <PageHeader title={'Editor'} description="Erstelle dein eigenes Quiz" />
      <BoxWrapper>
        <Flex flexDir={{ base: 'column', md: 'row' }} gap="1rem" align="center">
          {/*------------------- Quiz title --------------------*/}
          <InputGroup>
            <Tooltip label="Quiz Titel">
              <InputLeftAddon>
                <FaEdit />
              </InputLeftAddon>
            </Tooltip>
            <Input
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              borderColor="teal.500"
              autoComplete="on"
              id="nick-name"
              placeholder="Titel"
            />
          </InputGroup>

          {/*------------------- Course Of Study --------------------*/}
          <InputGroup>
            <Tooltip label="Studiengang">
              <InputLeftAddon>
                <FaGraduationCap />
              </InputLeftAddon>
            </Tooltip>
            <Select
              onChange={handelChange}
              ref={courseOfStudySelectRef}
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
          </InputGroup>

          {/*------------------- Course --------------------*/}
          <InputGroup>
            <Tooltip label="Modul">
              <InputLeftAddon>
                <FaBook />
              </InputLeftAddon>
            </Tooltip>
            <Select ref={moduleSelectRef}>
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
        </Flex>
      </BoxWrapper>
    </>
  );
}

export { QuizEditor };
