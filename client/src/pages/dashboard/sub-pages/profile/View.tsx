import { Avatar, Box, Text, Flex, Heading } from '@chakra-ui/react';

interface ViewProps {
  profileImageUrl?: string;
  nickName?: string;
  email?: string;
}

function View({ profileImageUrl, nickName, email }: ViewProps) {
  return (
    <Box>
      <Flex gap={{ base: '1rem', md: '2rem' }}>
        <Avatar src={profileImageUrl} size={{ base: 'lg', md: '2xl' }} borderRadius="md" />
        <Box>
          <Heading size="lg">{nickName}</Heading>
          <Text>{email}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export { View };
