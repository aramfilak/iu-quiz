import { Box, BoxProps, Heading, Text, useColorModeValue } from '@chakra-ui/react';

interface PageHeaderProps extends BoxProps {
  title: string;
  description: string;
}

function PageHeader({ title, description, ...rest }: PageHeaderProps) {
  return (
    <Box {...rest} mb="2rem" textAlign="center">
      <Heading fontWeight="bold" fontSize="3xl" mb="0.2 rem">
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.500', 'gray.300')}>{description}</Text>
    </Box>
  );
}

export { PageHeader };
