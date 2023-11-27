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
import faqs from '../../../data/faqs.json';
import { PageHeader } from '../../../components';

function FAQs() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | number[] | undefined>(
    undefined
  );

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupByCategory = filteredFaqs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    },
    {} as Record<string, typeof faqs>
  );

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
    <>
      <Box mx="auto" maxW="600px" mb="4">
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
      </Box>

      {Object.entries(groupByCategory).length === 0 ? (
        <Box textAlign="center">
          <Text>Keine Antwort gefunden? Kontaktiere uns!</Text>
          <Link target="_blank" href="mailto:iu.quiz.app@gmail.com" fontWeight="bold">
            iu.quiz.app@gmail.com
          </Link>
        </Box>
      ) : (
        <Accordion allowToggle index={openQuestionIndex} onChange={handleAccordionChange}>
          {Object.entries(groupByCategory).map(([category, faqs]) => (
            <AccordionItem key={category}>
              <Heading as="h2" fontSize="xl" mb={2} textAlign="left" marginBlock="1rem">
                {category}
              </Heading>
              {faqs.map((faq, index) => (
                <AccordionItem key={index}>
                  <AccordionButton>{`${index + 1}. ${faq.question}`}</AccordionButton>
                  <AccordionPanel>
                    <p>{`${faq.answer}`}</p>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}

export { FAQs };
