import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WrapperBoxProps extends BoxProps {
  children: ReactNode;
}

function WrapperBox({ children, ...rest }: WrapperBoxProps) {
  return (
    <Box bg="gray.50" _dark={{ bg: 'gray.700' }} p="1rem" borderRadius="md" {...rest}>
      {children}
    </Box>
  );
}

export { WrapperBox };
