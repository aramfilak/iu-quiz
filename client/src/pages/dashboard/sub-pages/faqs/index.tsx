/* eslint-disable react-hooks/rules-of-hooks */
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  useColorModeValue,
  Link,
  Text
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import faqsData from './data.json';
import { PageHeader } from '../../../../components';

interface FAQ {
  category: string;
  question: string;
  answer: string;
}

function FAQs() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [faqs] = useState<FAQ[]>(faqsData);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | number[] | undefined>(
    undefined
  );

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupByCategory = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setOpenQuestionIndex(-1);
  };

  const handleAccordionChange = (index: number) => {
    setOpenQuestionIndex(index);
  };

  const handleDeleteSearch = () => {
    setSearchTerm('');
    setOpenQuestionIndex(-1);
  };

  return (
    <Box p={4} textAlign="center">
      <Box mx="auto" maxW="600px" mb={4}>
        <PageHeader title={'FAQs'} description="Finde schnell deine Antwort" />
        <InputGroup>
          <Input
            variant="outline"
            type="text"
            placeholder="Suchen ..."
            value={searchTerm}
            onChange={handleSearchChange}
            bg={useColorModeValue('white', 'gray.800')}
            borderColor={useColorModeValue('gray.300', 'gray.600')}
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
      </Box>

      {Object.entries(groupByCategory).length === 0 ? (
        <Box>
          <Text>Keine Antwort gefunden? Kontaktiere uns!</Text>

          <Link
            href="mailto:iu.quiz.app@gmail.com"
            fontWeight="bold"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('teal.500', 'teal.300')}
          >
            iu.quiz.app@gmail.com
          </Link>
        </Box>
      ) : (
        <Accordion allowToggle index={openQuestionIndex} onChange={handleAccordionChange}>
          {Object.entries(groupByCategory).map(([category, faqs]) => (
            <AccordionItem key={category} mb={2}>
              <Heading as="h2" fontSize="xl" mb={2} textAlign="left" marginBlock="1rem">
                {category}
              </Heading>
              {faqs.map((faq, index) => (
                <AccordionItem
                  borderRadius="md"
                  key={index}
                  bg={useColorModeValue('gray.200', 'gray.800')}
                  mb={2}
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                >
                  <AccordionButton
                    textAlign="left"
                    borderRadius="md"
                    _hover={{ bg: useColorModeValue('gray.300', 'gray.700') }}
                  >
                    {`${index + 1}. ${faq.question}`}
                  </AccordionButton>
                  <AccordionPanel
                    pb={4}
                    textAlign="left"
                    bg={useColorModeValue('gray.50', 'gray.600')}
                    color={useColorModeValue('gray.800', 'gray.100')}
                    borderRadius={'0 0 5px 5px '}
                  >
                    <p>{`${faq.answer}`}</p>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Box>
  );
}

export { FAQs };
