import { Box, BoxProps, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WrapperBoxProps extends BoxProps {
  title?: string;
  children: ReactNode;
}

function BoxWrapper({
  flexDir,
  alignItems,
  justifyContent,
  title,
  children,
  ...rest
}: WrapperBoxProps) {
  return (
    <Box
      {...rest}
      bg="gray.50"
      _dark={{ bg: 'gray.700' }}
      p="1rem"
      borderRadius="md"
      display="flex"
      justifyContent={justifyContent || 'start'}
      alignItems={alignItems || 'start'}
      flexDir={flexDir || 'column'}
      gap="1rem"
      shadow="base"
    >
      {title && (
        <Heading as="h3" fontSize="md">
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
}

export { BoxWrapper };
