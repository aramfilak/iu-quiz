import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  useColorModeValue,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Tooltip,
  Heading,
  Text,
  IconButton
} from '@chakra-ui/react';
import {
  FaSearch,
  FaChevronDown,
  FaGraduationCap,
  FaBook,
  FaSync,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { PageHeader, BoxWrapper, QuizCardSkeleton, QuizCardsGrid } from '../../../components';
import { useEffect, useState } from 'react';
import { useQuizStore, useStudentStore } from '../../../stores';
import courseOfStudy from '../../../data/courseOfStudy.json';
import { QuizCard } from '../../../components/QuizCard';
import { Quiz } from '../../../utils/types';

function FindQuiz() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { isLoading, getAllQuizzes } = useQuizStore();
  const { studentProfile } = useStudentStore();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedSortOrder, setSelectedSortOrder] = useState<string | string | null>(null);
  const [selectedFilterProperty, setSelectedFilterProperty] = useState<string | null>(null);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[] | undefined>(undefined);
  const [isBoxOpen, setIsBoxOpen] = useState(true);
  const boxShadowDark = isBoxOpen ? '' : '1px solid #4a5568';

  const handleToggleBox = () => {
    setIsBoxOpen((prev) => !prev);
  };

  const handleFilterReset = () => {
    setSelectedFilterProperty(null);
    setSelectedSortOrder(null);
    setSelectedCourse(null);
    setSelectedModules([]);
  };

  const handlePropertyChange = (property: string) => {
    setSelectedFilterProperty((prev) => (prev === property ? null : property));
    if (selectedFilterProperty === property) setSelectedSortOrder(null);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSortOrder((prev) => (prev === sort ? null : sort));
  };

  const handleCourseChange = (course: string) => {
    setSelectedCourse((prev) => (prev === course ? null : course));
    if (!course) {
      setSelectedModules([]);
    }
  };

  const handleModuleChange = (module: string) => {
    const updatedCourses = selectedModules.includes(module)
      ? selectedModules.filter((c) => c !== module)
      : [...selectedModules, module];

    setSelectedModules(updatedCourses);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllQuizzes({});
      setAllQuizzes(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Box mx="auto" maxW="600px" mb="4">
        <PageHeader title={'Quiz Finden'} description="Finde passende Quiz für dich." />
        <Flex flexDir={{ base: 'column', sm: 'row' }} flexWrap="wrap" gap="1rem">
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
            {isBoxOpen && (
              <Box w="100%">
                <Flex w="100%" flexDir={'column'} gap="1rem">
                  {/* Filter properties checkboxes */}
                  <Flex flexDir="column">
                    <Heading mb="0.5rem" as="h3" fontSize="md">
                      Kategorie:
                    </Heading>
                    <Checkbox
                      onChange={() => handlePropertyChange('popularity')}
                      isChecked={selectedFilterProperty === 'popularity'}
                    >
                      Beliebtheit
                    </Checkbox>
                    <Checkbox
                      onChange={() => handlePropertyChange('size')}
                      isChecked={selectedFilterProperty === 'size'}
                    >
                      Anzahl der Fragen
                    </Checkbox>
                    <Checkbox
                      onChange={() => handlePropertyChange('updatedAt')}
                      isChecked={selectedFilterProperty === 'updatedAt'}
                    >
                      Letztes Update
                    </Checkbox>
                  </Flex>

                  {/* Filter sortOrder checkboxes */}
                  <Flex flexDirection="column">
                    <Heading mb="0.5rem" as="h3" fontSize="md">
                      Sortieren:
                    </Heading>
                    <Checkbox
                      disabled={!selectedFilterProperty}
                      onChange={() => handleSortChange('asc')}
                      isChecked={selectedSortOrder === 'asc'}
                    >
                      Aufsteigend
                    </Checkbox>
                    <Checkbox
                      disabled={!selectedFilterProperty}
                      onChange={() => handleSortChange('desc')}
                      isChecked={selectedSortOrder === 'desc'}
                    >
                      Absteigend
                    </Checkbox>
                  </Flex>
                </Flex>
                <Flex mt="1rem" w="100%" flexDir={'column'} gap="1rem">
                  {/* Course of Study menu */}
                  <Menu matchWidth={true} autoSelect={false}>
                    <MenuButton w="100%" as={Button} rightIcon={<FaChevronDown />}>
                      <Flex display="flex" alignItems="center" justify="center">
                        <FaGraduationCap />
                        <Text
                          fontWeight="bold"
                          color="white"
                          _dark={{
                            color: 'gray.500',
                            borderColor: 'gray.500',
                            _hover: { color: 'gray.400', borderColor: 'gray.400' }
                          }}
                          ml="0.5rem"
                        >
                          Studiengang
                        </Text>
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      {courseOfStudy.map((course) => (
                        <MenuItem key={course.name}>
                          <Checkbox
                            isChecked={selectedCourse === course.name}
                            onChange={() => handleCourseChange(course.name)}
                          >
                            {course.name}
                          </Checkbox>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                  {/* Module menu */}
                  <Menu matchWidth={true} closeOnSelect={false} autoSelect={false}>
                    <MenuButton
                      w="100%"
                      isDisabled={!selectedCourse}
                      as={Button}
                      rightIcon={<FaChevronDown />}
                    >
                      <Flex display="flex" alignItems="center" justify="center">
                        <FaBook />
                        <Text
                          fontWeight="bold"
                          color="white"
                          _dark={{
                            color: 'gray.500',
                            borderColor: 'gray.500',
                            _hover: { color: 'gray.400', borderColor: 'gray.400' }
                          }}
                          ml="0.5rem"
                        >
                          Module
                        </Text>
                      </Flex>
                    </MenuButton>
                    <MenuList maxH="19rem" overflowY="auto">
                      {courseOfStudy
                        ?.find(({ name }) => name === selectedCourse)
                        ?.courses?.map(({ title }) => (
                          <MenuItem key={title}>
                            <Checkbox
                              isChecked={selectedModules.includes(title)}
                              onChange={() => handleModuleChange(title)}
                            >
                              {title}
                            </Checkbox>
                          </MenuItem>
                        )) || []}
                    </MenuList>
                  </Menu>
                </Flex>
              </Box>
            )}
          </BoxWrapper>
          <Flex w="100%" justify="center" h="20%">
            {/* ________________ Collapse Button ____________________ */}
            <Tooltip label={!isBoxOpen ? 'Filter öffnen' : 'Filter schließen'} placement="bottom">
              <IconButton
                display={{ base: 'flex', md: 'flex' }}
                height="20%"
                top={isBoxOpen ? '-1.5rem' : '-1.5rem'}
                borderRadius="xl"
                onClick={handleToggleBox}
                aria-label="Toggle Sidebar"
                fontSize="1.1rem"
                size="sm"
                boxShadow={isBoxOpen ? 'none' : '1px 0 0 0.2px rgba(0, 0, 0,0.1)'}
                colorScheme="gray"
                bg="white"
                color="teal"
                _hover={{ bg: 'white' }}
                _dark={{
                  bg: 'gray.800',
                  color: 'teal.200',
                  boxShadow: 'none',
                  borderRight: boxShadowDark,
                  _hover: { bg: 'gray.800' }
                }}
              >
                {isBoxOpen ? <FaArrowUp /> : <FaArrowDown />}
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>
      </Box>

      {isLoading ? (
        <QuizCardSkeleton />
      ) : (
        <QuizCardsGrid>
          {allQuizzes?.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              isAuthor={quiz.authorId === studentProfile?.studentId}
            />
          ))}
        </QuizCardsGrid>
      )}
    </>
  );
}

export { FindQuiz };
