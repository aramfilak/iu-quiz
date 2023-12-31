import {
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Image,
  SpaceProps,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import logo from '../../../assets/logo.png';
import { ContactFormAlert } from '../../../components';

function DashboardFooter({ ml }: SpaceProps) {
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
        <HStack gap="0">
          <Image src={logo} alt="iu quiz app logo" maxW="3rem" />
          <Text fontSize="sm">copyright &copy; {new Date().getFullYear()}</Text>
        </HStack>

        <ButtonGroup variant="tertiary">
          <Tooltip label="GitHub" placement="top">
            <IconButton
              cursor="pointer"
              as="a"
              href="https://github.com/aramfilak/iu-quiz"
              aria-label="GitHub"
              target="_blank"
              icon={<FaGithub />}
            />
          </Tooltip>
          <Tooltip label="Support" placement="top">
            <IconButton
              cursor="pointer"
              as="a"
              onClick={contactFormAlert.onOpen}
              aria-label="Support-Kontakt"
              icon={<FiMail />}
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export { DashboardFooter };
