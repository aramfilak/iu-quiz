import { GridItem, GridItemProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WrapperBoxProps extends GridItemProps {
  children: ReactNode;
}

function BoxWrapper({ children, ...rest }: WrapperBoxProps) {
  return (
    <GridItem
      {...rest}
      bg="gray.50"
      _dark={{ bg: 'gray.700' }}
      p="1rem"
      borderRadius="md"
      display="flex"
      justifyContent="center"
      alignItems="start"
      flexDir="column"
      gap="1rem"
    >
      {children}
    </GridItem>
  );
}

export { BoxWrapper };
