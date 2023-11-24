import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WrapperBoxProps extends BoxProps {
  children: ReactNode;
}

function BoxWrapper({ children, ...rest }: WrapperBoxProps) {
  return (
    <Box
      {...rest}
      bg="gray.50"
      _dark={{ bg: 'gray.700' }}
      p="1rem"
      borderRadius="md"
      display="flex"
      justifyContent="start"
      alignItems="start"
      flexDir="column"
      gap="1rem"
    >
      {children}
    </Box>
  );
}

export { BoxWrapper };
