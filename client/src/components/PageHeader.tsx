import { Box, BoxProps, Heading, Text } from '@chakra-ui/react';

interface PageHeaderProps extends BoxProps {
  title: string;
  description: string;
}

function PageHeader({ title, description, ...rest }: PageHeaderProps) {
  return (
    <Box as="header" {...rest} mb="2rem" textAlign="center" textTransform="capitalize">
      <Heading fontWeight="900" fontSize={{ base: '2rem', md: '3rem' }} mb="0.2 rem">
        {title}
      </Heading>
      <Text fontSize={{ base: '1rem', md: '1.2rem' }} textTransform="none">
        {description}
      </Text>
    </Box>
  );
}

export { PageHeader };
