import { Box, BoxProps, Heading, Text } from '@chakra-ui/react';

interface PageHeaderProps extends BoxProps {
  title: string;
  description: string;
}

function PageHeader({ title, description, ...rest }: PageHeaderProps) {
  return (
    <Box as="header" {...rest} mb="2rem" textAlign="center" textTransform="capitalize">
      <Heading as="h1" fontWeight="900" fontSize={{ base: '2rem', xl: '3rem' }} mb="0.2 rem">
        {title}
      </Heading>
      <Text as="h2" fontSize={{ base: '1rem', xl: '1.2rem' }} textTransform="none">
        {description}
      </Text>
    </Box>
  );
}

export { PageHeader };
