import { Heading, Text, Image, VStack, StackProps } from '@chakra-ui/react';
import noResultFoundImage from '../assets/no-result-found.svg';
import { ReactNode } from 'react';

interface NoResultFoundProps extends StackProps {
  title: string;
  description: string;
  children?: ReactNode;
}

function NoResultFound({ title, description, children, ...rest }: NoResultFoundProps) {
  return (
    <VStack {...rest} flexDir="column">
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      <Image maxW="22rem" src={noResultFoundImage} alt="Keine Ergebnisse gefunden" />
      {children}
    </VStack>
  );
}

export { NoResultFound };
