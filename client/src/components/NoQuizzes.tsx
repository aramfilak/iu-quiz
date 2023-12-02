import { Heading, Flex, FlexProps, Text, Image } from '@chakra-ui/react';
import notResultsIllustration from '../assets/no-results.png';
import { ReactNode } from 'react';

interface NoQuizzesProps extends FlexProps {
  title: string;
  description: string;
  children?: ReactNode;
}

function NoQuizzes({ title, description, children, ...rest }: NoQuizzesProps) {
  return (
    <Flex flexDir="column" alignItems="center" gap="2" {...rest}>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      <Image maxW="22rem" src={notResultsIllustration} alt="Quiz Not Found"></Image>
      {children}
    </Flex>
  );
}

export { NoQuizzes };
