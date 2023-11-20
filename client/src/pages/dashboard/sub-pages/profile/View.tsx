import { Avatar, Text, Flex, Heading } from '@chakra-ui/react';
import { convertToGermanDate } from '../../../../utils/helpers';
import { useStudentStore } from '../../../../sotres';

function View() {
  const { studentProfile } = useStudentStore();

  return (
    <Flex gap={{ base: '1rem', md: '1rem' }} alignItems="end">
      <Avatar
        src={studentProfile?.profileImage?.url}
        size={{ base: 'lg', md: '2xl' }}
        borderRadius="md"
      />
      <Flex flexDir="column" gap="0.2rem">
        <Heading size="lg">{studentProfile?.name}</Heading>
        <Text>
          Mitglied seit{' '}
          {typeof studentProfile?.registrationDate === 'string' &&
            convertToGermanDate(studentProfile?.registrationDate)}
        </Text>
        <Text>{studentProfile?.student.email}</Text>
      </Flex>
    </Flex>
  );
}

export { View };
