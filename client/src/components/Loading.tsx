import { Box, BoxProps, Spinner, Text } from '@chakra-ui/react';

function Loading(rest: BoxProps) {
  return (
    <Box {...rest}>
      <Box display="flex" gap="1rem">
        <Text fontSize={{ base: '1rem', md: '1.3rem', xl: '1.5rem' }}>Es lädt</Text>
        <Spinner color="teal.500" size={{ base: 'md', md: 'lg' }} />
      </Box>
    </Box>
  );
}

export { Loading };
