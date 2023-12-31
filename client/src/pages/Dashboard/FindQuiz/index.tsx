import {
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaBinoculars, FaBook, FaGraduationCap, FaSearch, FaSync } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import {
  BoxWrapper,
  NoResultFound,
  PageHeader,
  QuizCardSkeleton,
  QuizCardsGrid
} from '../../../components';
import Pagination from '../../../components/Pagination';
import { QuizCard } from '../../../components/QuizCard';
import courseOfStudy from '../../../data/courseOfStudy.json';
import { useFetch } from '../../../hooks';
import { useQuizStore } from '../../../stores';
import { QuizQueryParams } from '../../../utils/types';

function FindQuiz() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const getAllQuizzes = useQuizStore((state) => state.getAllQuizzes);
  const toggleFollowQuiz = useQuizStore((state) => state.toggleFollowQuiz);
  const [selectedCourseOfStudy, setSelectedCourseOfStudy] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSortOrder, setSelectedSortOrder] = useState<string>('asc');
  const [selectedFilterProperty, setSelectedFilterProperty] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const [params, setParams] = useState<QuizQueryParams>({ page: '1', unFollowed: true });
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const { isLoading, data, refetchData } = useFetch(() => getAllQuizzes(params));
  const unFollowedQuizzes = data?.quizzes;
  const totalPages = data?.totalPages;

  const handleFlowQuiz = (quizId: number) => {
    setIsSubmitting(true);
    toggleFollowQuiz(quizId)
      .then(() => refetchData())
      .catch(() => toast({ status: 'error', description: 'Folgen fehlgeschlagen' }))
      .finally(() => setIsSubmitting(false));
  };

  const handleFilterReset = () => {
    setSelectedFilterProperty('');
    setSelectedSortOrder('asc');
    setSelectedCourseOfStudy('');
    setSelectedCourse('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPageIndex(1);
    const selCourseOfStudy = selectedCourseOfStudy;
    const selCourse = selectedCourse;
    const selSortOrder = selectedSortOrder;
    const selFilterProperty = selectedFilterProperty;

    setParams((prevParams) => ({
      ...prevParams,
      page: currentPageIndex.toString(),
      courseOfStudy: selCourseOfStudy,
      course: selCourse,
      size: selFilterProperty === 'size',
      likes: selFilterProperty === 'likes',
      updatedAt: selFilterProperty === 'updateAt',
      sort: selSortOrder,
      searchTerm: searchTerm.trim()
    }));

    refetchData();

    setIsSubmitting(false);
  };

  const handlePreviousPage = () => {
    setCurrentPageIndex((prevPage) => prevPage - 1);

    setParams((prevParams) => ({
      ...prevParams,
      page: (currentPageIndex - 1).toString()
    }));

    refetchData();
  };

  const handleNextPage = () => {
    setCurrentPageIndex((prevPage) => prevPage + 1);

    setParams((prevParams) => ({
      ...prevParams,
      page: (currentPageIndex + 1).toString()
    }));

    refetchData();
  };

  const handlePageClick = (pageNumbers: number) => {
    setCurrentPageIndex(pageNumbers);

    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumbers.toString()
    }));

    refetchData();
  };

  return (
    <>
      <PageHeader
        title="Quiz Finden"
        description="Jedes Thema. Jedes Quiz. Finde das passende für dich."
      />
      <BoxWrapper mb="8">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/*------------------- Search Bar -----------------*/}
          <InputGroup mb="4" gap="2">
            <Input
              type="search"
              placeholder="Nach Quiz Titel suchen ..."
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
              />
            )}
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaSearch} color="gray.300" />}
            />
          </InputGroup>

          <Flex flexWrap="wrap" rowGap="2" justifyContent="space-between">
            {/* _________________ Filter properties radios ______________ */}

            <RadioGroup
              onChange={setSelectedFilterProperty}
              value={selectedFilterProperty}
              colorScheme="teal"
              flexDir="column"
              display="flex"
            >
              <Heading as="h3" fontSize="md">
                Kategorie:
              </Heading>
              <Radio value="likes">Likes</Radio>
              <Radio value="size">Anzahl der Fragen</Radio>
              <Radio value="updateAt">Letztes Update</Radio>
            </RadioGroup>

            {/* _____________________ Filter sortOrder radios _____________ */}

            <RadioGroup
              flexDir="column"
              display="flex"
              isDisabled={!selectedFilterProperty}
              onChange={setSelectedSortOrder}
              value={selectedSortOrder}
              colorScheme="teal"
            >
              <Heading as="h3" fontSize="md">
                Sortieren:
              </Heading>
              <Radio value="asc">Aufsteigend</Radio>
              <Radio value="desc">Absteigend</Radio>
            </RadioGroup>

            {/*------------------- Course Of Study  & Course--------------------*/}
            <VStack w="min(100%,30rem)" mt={{ base: '4', md: '0' }}>
              <InputGroup width="full">
                <Tooltip label="Studiengang">
                  <InputLeftAddon>
                    <FaGraduationCap />
                  </InputLeftAddon>
                </Tooltip>
                <Select
                  value={selectedCourseOfStudy}
                  defaultValue={''}
                  onChange={(e) => setSelectedCourseOfStudy(e.target.value)}
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

              <InputGroup width="full">
                <Tooltip label="Modul">
                  <InputLeftAddon>
                    <FaBook />
                  </InputLeftAddon>
                </Tooltip>
                <Select
                  value={selectedCourse}
                  defaultValue={''}
                  isDisabled={!selectedCourseOfStudy}
                  onChange={(e) => setSelectedCourse(e.target.value)}
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
            </VStack>
          </Flex>

          <HStack justify="end" mt="8">
            {/*------------------- Reset Form Button --------------------*/}

            <Button
              aria-label="Zurücksetzen"
              colorScheme="blue"
              onClick={handleFilterReset}
              type="button"
              leftIcon={<FaSync />}
            >
              zurücksetzen
            </Button>
            {/*------------------- Submit Button --------------------*/}

            <Button
              aria-label="Anwenden"
              type="submit"
              isLoading={isSubmitting || isLoading}
              leftIcon={<FaBinoculars />}
            >
              Anwenden
            </Button>
          </HStack>
        </form>
      </BoxWrapper>

      {isLoading ? (
        <QuizCardSkeleton />
      ) : unFollowedQuizzes?.length ? (
        <QuizCardsGrid>
          {unFollowedQuizzes?.map((quiz) => (
            <QuizCard
              isLoading={isSubmitting}
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

      {totalPages && totalPages > 0 && (
        <Pagination
          mt="20"
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
          isLoading={isLoading}
          currentPage={currentPageIndex}
        />
      )}
    </>
  );
}

export { FindQuiz };
