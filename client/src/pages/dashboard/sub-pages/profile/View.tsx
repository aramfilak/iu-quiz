import { Avatar, Text, Flex, Heading } from '@chakra-ui/react';
import { convertToGermanDate } from '../../../../utils/helpers';
interface ViewProps {
  profileImageUrl?: string;
  nickName?: string;
  email?: string;
  registrationDate?: string;
}

function View({ profileImageUrl, nickName, email, registrationDate }: ViewProps) {
  return (
    <>
      <Flex gap={{ base: '1rem', md: '1rem' }} alignItems="end">
        <Avatar src={profileImageUrl} size={{ base: 'lg', md: '2xl' }} borderRadius="md" />
        <Flex flexDir="column" gap="0.2rem">
          <Heading size="lg">{nickName}</Heading>
          <Text>Mitglied seit {registrationDate && convertToGermanDate(registrationDate)}</Text>
          <Text>{email}</Text>
        </Flex>
      </Flex>
    </>
  );
}

export { View };
