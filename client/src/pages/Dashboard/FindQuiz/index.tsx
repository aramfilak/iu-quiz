import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Button,
  Flex,
  Tooltip,
  Heading,
  useToast,
  InputLeftAddon,
  Select,
  Radio,
  RadioGroup,
  IconButton
} from '@chakra-ui/react';
import { FaSearch, FaGraduationCap, FaBook, FaSync } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import {
  PageHeader,
  BoxWrapper,
  QuizCardSkeleton,
  QuizCardsGrid,
  NoResultFound
} from '../../../components';
import { useState } from 'react';
import { useQuizStore } from '../../../stores';
import courseOfStudy from '../../../data/courseOfStudy.json';
import { QuizCard } from '../../../components/QuizCard';
import { useFetch } from '../../../hooks';
import { QuizQueryParams } from '../../../utils/types';

function FindQuiz() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { getAllQuizzes, followQuiz } = useQuizStore();
  const [selectedCourseOfStudy, setSelectedCourseOfStudy] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSortOrder, setSelectedSortOrder] = useState<string>('asc');
  const [selectedFilterProperty, setSelectedFilterProperty] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const [params, setParams] = useState<QuizQueryParams>({ page: '1', unFollowed: true });
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
      success: { description: 'Quiz gefolgt' },
      error: { description: 'Folgen fehlgeschlagen' },
      loading: { description: 'Es lädt..' }
    });
  };

  const handleFilterReset = () => {
    setSelectedFilterProperty('');
    setSelectedSortOrder('asc');
    setSelectedCourseOfStudy('');
    setSelectedCourse('');
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

    setParams((prevParams) => ({
      ...prevParams,
      courseOfStudy: selCourseOfStudy,
      course: selCourse,
      size: selFilterProperty === 'size',
      popularity: selFilterProperty === 'popularity',
      updatedAt: selFilterProperty === 'updateAt',
      sort: selSortOrder
    }));

    refetchData();

    setIsSubmitting(false);
  };

  return (
    <>
      <Box mx="auto" maxW="600px" mb="4">
        <PageHeader title="Quiz Finden" description="Finde passende Quiz für dich." />
        <form onSubmit={handleSubmit}>
          <Flex flexDir={{ base: 'column', sm: 'row' }} flexWrap="wrap" gap="1rem">
            <Flex w="100%" flexDir="row" gap="1rem">
              <InputGroup>
                <Input
                  variant="outline"
                  type="text"
                  placeholder="Nach Quiz-Titel suchen ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg="white"
                  borderColor="gray.300"
                  _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
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
                        onClick={() => setSearchTerm('')}
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
                  <IconButton
                    aria-label=""
                    icon={<FaSync />}
                    h="0"
                    color="teal"
                    onClick={handleFilterReset}
                    paddingRight="0"
                  ></IconButton>
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
                    <Heading as="h3" fontSize="md">
                      Kategorie:
                    </Heading>
                    <RadioGroup
                      mt={2}
                      onChange={setSelectedFilterProperty}
                      value={selectedFilterProperty}
                      colorScheme="teal"
                    >
                      <Flex ml="1" flexDirection="column">
                        <Radio value="popularity">Beliebtheit</Radio>
                        <Radio value="size">Anzahl der Fragen</Radio>
                        <Radio value="updateAt">Letztes Update</Radio>
                      </Flex>
                    </RadioGroup>
                  </Flex>
                  {/* Filter sortOrder checkboxes */}
                  <Flex flexDirection="column">
                    <Heading as="h3" fontSize="md">
                      Sortieren:
                    </Heading>
                    <RadioGroup
                      mt={2}
                      isDisabled={!selectedFilterProperty}
                      onChange={setSelectedSortOrder}
                      value={selectedSortOrder}
                      colorScheme="teal"
                    >
                      <Flex ml="1" flexDirection="column">
                        <Radio value="asc">Aufsteigend</Radio>
                        <Radio value="desc">Absteigend</Radio>
                      </Flex>
                    </RadioGroup>
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
      ) : unFollowedQuizzes?.length ? (
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
      ) : (
        <NoResultFound
          title="Keine Ergebnisse gefunden"
          description="Es gibt keine Quizfragen, denen man folgen kann"
        />
      )}
    </>
  );
}

export { FindQuiz };
