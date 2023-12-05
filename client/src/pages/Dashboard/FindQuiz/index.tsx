import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  useColorModeValue,
  Button,
  Flex,
  Tooltip,
  Heading,
  useToast,
  InputLeftAddon,
  Select
} from '@chakra-ui/react';
import { FaSearch, FaGraduationCap, FaBook, FaSync } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import {
  PageHeader,
  BoxWrapper,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../components';
import { useState } from 'react';
import { useQuizStore } from '../../../stores';
import courseOfStudy from '../../../data/courseOfStudy.json';
import { QuizCard } from '../../../components/QuizCard';
import { useFetch } from '../../../hooks';
import { QuizQueryParams } from '../../../utils/types';
import CustomCheckboxGroup from '../../../components/CustomCheckboxGroup';

function FindQuiz() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { getAllQuizzes, followQuiz } = useQuizStore();
  const [selectedCourseOfStudy, setSelectedCourseOfStudy] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSortOrder, setSelectedSortOrder] = useState<string | undefined>('asc');
  const [selectedFilterProperty, setSelectedFilterProperty] = useState<
    string | undefined
  >(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const [params, setParams] = useState<QuizQueryParams>({ unFollowed: true });
  const {
    isLoading,
    data: unFollowedQuizzes,
    refetchData
  } = useFetch(() => getAllQuizzes(params));

  const handleFlowQuiz = (quizId: number) => {
    const response = new Promise((resolve, reject) =>
      followQuiz(quizId)
        .then(() => resolve(refetchData()))
        .catch(() => reject())
    );

    toast.promise(response, {
      success: { description: 'Quiz gefolget' },
      error: { description: 'Folgen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  const handleFilterReset = () => {
    handlePropertyChange(undefined);
    setSelectedSortOrder('asc');
    setSelectedCourseOfStudy('');
    setSelectedCourse('');
  };

  const handlePropertyChange = (property: string | undefined) => {
    setSelectedFilterProperty(property);
  };

  const handleSortChange = (sort: string | undefined) => {
    setSelectedSortOrder(sort);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteSearch = () => {
    setSearchTerm('');
  };

  const handleCourseOfStudyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourseOfStudy = e.target.value;
    setSelectedCourseOfStudy(selectedCourseOfStudy);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = e.target.value;
    setSelectedCourse(selectedCourse);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selCourseOfStudy = selectedCourseOfStudy;
    const selCourse = selectedCourse;
    const selSortOrder = selectedSortOrder;
    const selFilterProperty = selectedFilterProperty;

    setParams({
      unFollowed: true,
      courseOfStudy: selCourseOfStudy,
      course: selCourse,
      size: selFilterProperty === 'size',
      popularity: selFilterProperty === 'popularity',
      updatedAt: selFilterProperty === 'updateAt',
      sort: selSortOrder
    });

    refetchData();

    setIsSubmitting(false);
  };

  return (
    <>
      <Box mx="auto" maxW="600px" mb="4">
        <PageHeader title="Quiz Finden" description="Finde passende Quiz für dich." />
        <form onSubmit={handleSubmit}>
          <Flex flexDir={{ base: 'column', sm: 'row' }} flexWrap="wrap" gap="1rem">
            <Flex w="100%" flexDir={'row'} gap="1rem">
              <InputGroup>
                <Input
                  variant="outline"
                  type="text"
                  placeholder="Nach Quiz-Titel suchen ..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderColor={useColorModeValue('gray.300', 'gray.600')}
                  focusBorderColor="teal.500"
                />
                {searchTerm && (
                  <InputRightElement
                    children={
                      <Icon
                        as={IoMdClose}
                        cursor="pointer"
                        color="gray.300"
                        fontSize="20px"
                        onClick={handleDeleteSearch}
                      />
                    }
                    style={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  />
                )}
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FaSearch} color="gray.300" />}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                />
              </InputGroup>
              {/*------------------- Save Button -----------------*/}

              <Button
                alignSelf="end"
                width={'fit-content'}
                colorScheme="teal"
                type="submit"
                disabled={isSubmitting}
                leftIcon={<FaSearch />}
              >
                Suchen
              </Button>
            </Flex>

            <BoxWrapper w="100%">
              <Flex w="100%" justify="space-between" align="center">
                <Heading as="h3" fontSize="md">
                  Filtereinstellungen
                </Heading>
                <Tooltip label="Filter zurücksetzen" margin="bottom">
                  <Button
                    h="0"
                    onClick={handleFilterReset}
                    colorScheme="transparent"
                    paddingRight="0"
                  >
                    <FaSync color="teal"></FaSync>
                  </Button>
                </Tooltip>
              </Flex>

              <Box w="100%">
                <Flex
                  flexDir={{ base: 'column', sm: 'row' }}
                  justify={'space-between'}
                  w="80%"
                  gap="1rem"
                >
                  {/* Filter properties checkboxes */}
                  <Flex flexDir="column">
                    <CustomCheckboxGroup
                      labels={['Beliebtheit', 'Anzahl der Fragen', 'Letztes Update']}
                      propertyValues={['popularity', 'size', 'updatedAt']}
                      heading="Kategorie:"
                      handleCheckboxChange={handlePropertyChange}
                      isMandatory={false}
                      selectedCheckbox={selectedFilterProperty}
                    />
                  </Flex>
                  {/* Filter sortOrder checkboxes */}
                  <Flex flexDirection="column">
                    <CustomCheckboxGroup
                      labels={['Aufsteigend', 'Absteigend']}
                      propertyValues={['asc', 'desc']}
                      heading="Sortieren:"
                      disabled={!selectedFilterProperty}
                      handleCheckboxChange={handleSortChange}
                      isMandatory={true}
                      selectedCheckbox={selectedSortOrder}
                    />
                  </Flex>
                </Flex>
                <Flex mt="1rem" w="100%" flexDir={'column'} gap="1rem">
                  {/*------------------- Course Of Study --------------------*/}
                  <InputGroup>
                    <Tooltip label="Studiengang">
                      <InputLeftAddon>
                        <FaGraduationCap />
                      </InputLeftAddon>
                    </Tooltip>
                    <Select
                      value={selectedCourseOfStudy}
                      defaultValue={''}
                      onChange={handleCourseOfStudyChange}
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
                    <Select
                      value={selectedCourse}
                      defaultValue={''}
                      isDisabled={!selectedCourseOfStudy}
                      onChange={handleCourseChange}
                    >
                      <option value="" disabled hidden>
                        Module auswählen
                      </option>
                      {courseOfStudy
                        ?.find(({ name }) => name === selectedCourseOfStudy)
                        ?.courses?.map(({ name }) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        )) || []}
                    </Select>
                  </InputGroup>
                </Flex>
              </Box>
            </BoxWrapper>
          </Flex>
        </form>
      </Box>

      {isLoading ? (
        <QuizCardSkeleton />
      ) : (
        <QuizCardsGrid>
          {unFollowedQuizzes?.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              displayFollowButton={{
                onFollow: () => handleFlowQuiz(quiz.id)
              }}
            />
          ))}
        </QuizCardsGrid>
      )}
    </>
  );
}

export { FindQuiz };
