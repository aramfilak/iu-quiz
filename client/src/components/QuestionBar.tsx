import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  Flex
} from '@chakra-ui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { BoxWrapper } from '.';

interface QuestionBarProps extends BoxProps {
  question: string;
  size: number;
  index: number;
}

function QuestionBar({ question, size, index, ...rest }: QuestionBarProps) {
  return (
    <BoxWrapper width="full" {...rest}>
      <Accordion width="full" allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                #{index + 1} {question}
              </Box>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb="4" bg="gray.100">
            <Flex justify="end" gap="2">
              <Button colorScheme="red">Löschen</Button>
              <Button>Bearbeiten</Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {size} Antworten
                  </Box>
                  {isExpanded ? <FiMinus /> : <FiPlus />}
                </AccordionButton>
              </h2>
              <AccordionPanel pb="4" bg="gray.100">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </BoxWrapper>
  );
}

export { QuestionBar };
