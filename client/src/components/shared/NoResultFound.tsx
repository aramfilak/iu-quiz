import { Heading, Image, StackProps, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import noResultFoundImage from '../../assets/no-result-found.svg';

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
