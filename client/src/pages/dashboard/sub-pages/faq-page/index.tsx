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
  useColorModeValue
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import faqsData from './faqsData.json';

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
        <Heading as="h1" mb={4}>
          Frequently Asked Questions
        </Heading>
        <InputGroup>
          <Input
            type="text"
            placeholder="Suchen ..."
            value={searchTerm}
            onChange={handleSearchChange}
            bg={useColorModeValue('white', 'gray.900')}
            style={{
              paddingLeft: '40px',
              width: '100%',
              boxSizing: 'border-box',
              borderColor: 'gray'
            }}
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
        <div>
          Keine Antwort gefunden? Kontaktiere uns! <br />
          <a href="mailto:iu.quiz.app@gmail.com" style={{ color: 'teal', fontWeight: 'bold' }}>
            iu.quiz.app@gmail.com
          </a>
        </div>
      ) : (
        <Accordion allowToggle index={openQuestionIndex} onChange={handleAccordionChange}>
          {Object.entries(groupByCategory).map(([category, faqs]) => (
            <AccordionItem key={category} border="none" mb={2}>
              <Heading as="h2" fontSize="xl" mb={2} textAlign="left">
                {category}
              </Heading>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  backgroundColor={useColorModeValue('white', 'gray.900')}
                  border="none"
                  mb={2}
                >
                  <AccordionButton textAlign="left" _hover={{ bg: 'teal.500', color: 'white' }}>
                    {`${index + 1}. ${faq.question}`}
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign="left">
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
