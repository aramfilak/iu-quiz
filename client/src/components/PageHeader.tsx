import { Box, BoxProps, Text } from '@chakra-ui/react';

interface PageHeaderProps extends BoxProps {
  title: string;
  description: string;
}

function PageHeader({ title, description, ...rest }: PageHeaderProps) {
  return (
    <Box {...rest} mb="2rem" textAlign="center">
      <Text fontWeight="bold" fontSize="3xl" mb="0.2 rem">
        {title}
      </Text>
      <Text color="gray.600">{description}</Text>
    </Box>
  );
}

export { PageHeader };
