import { Heading, Flex, FlexProps, Text, Image } from '@chakra-ui/react';
import notResultsIllustration from '../assets/no-results.png';

interface NoQuizzesProps extends FlexProps {
  title: string;
  description: string;
}

function NoQuizzes({ title, description, ...rest }: NoQuizzesProps) {
  return (
    <Flex flexDir="column" alignItems="center" gap="2" {...rest}>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      <Image maxW="22rem" src={notResultsIllustration} alt="Quiz Not Found"></Image>
    </Flex>
  );
}

export { NoQuizzes };
