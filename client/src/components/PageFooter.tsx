import {
  ButtonGroup,
  IconButton,
  Text,
  Image,
  Flex,
  SpaceProps,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { FiMessageCircle, FiMail } from 'react-icons/fi';
import logo from '../assets/logo.png';
import { ContactFormAlert } from '.';

function PageFooter({ ml }: SpaceProps) {
  const contactFormAlert = useDisclosure();

  return (
    <Flex
      ml={ml}
      alignItems="center"
      height="20"
      bg="white"
      _dark={{
        bg: 'gray.900'
      }}
      paddingBlock="4"
      paddingInline="4"
      overflow="hidden"
    >
      {/*------------------- Handle Contact Form Alert Dialog --------------------*/}
      <ContactFormAlert
        isOpen={contactFormAlert.isOpen}
        onClose={contactFormAlert.onClose}
      />

      <Flex
        justify={{ base: 'center', sm: 'space-between' }}
        w="full"
        align="center"
        wrap="wrap"
      >
        <Flex align="center">
          <Image mb="2" src={logo} alt="iu quiz app logo" maxW="3rem" />
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </Text>
        </Flex>

        <ButtonGroup variant="tertiary">
          <Tooltip label="GitHub" placement="top">
            <IconButton
              as="a"
              href="https://github.com/aramfilak/iu-quiz"
              aria-label="GitHub"
              icon={<FaGithub />}
            />
          </Tooltip>
          <Tooltip label="Support" placement="top">
            <IconButton
              as="a"
              onClick={contactFormAlert.onOpen}
              aria-label="Support-Kontakt"
              icon={<FiMessageCircle />}
            />
          </Tooltip>
          <Tooltip label="E-Mail" placement="top">
            <IconButton
              as="a"
              href="mailTo:iu.quiz.app@gmail.com"
              aria-label="Email"
              icon={<FiMail />}
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export { PageFooter };
