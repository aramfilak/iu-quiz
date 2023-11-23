import { Avatar, Text, Flex, Link } from '@chakra-ui/react';
import { convertToGermanDate } from '../../../../utils/helpers';
import { useStudentStore } from '../../../../sotres';
import { FiCalendar, FiMail } from 'react-icons/fi';
import { FaLinkedin, FaXingSquare } from 'react-icons/fa';

function View() {
  const { studentProfile } = useStudentStore();

  return (
    <Flex
      gap={{ base: '1rem', md: '1rem' }}
      flexDir={{ base: 'column', lg: 'row' }}
      justifyContent="start"
      alignItems="start"
    >
      {/*---------------- Profile Image -------------*/}

      <Avatar
        src={studentProfile?.profileImage?.url}
        size={{ base: 'xl', lg: '2xl' }}
        borderRadius="md"
      />

      <Flex
        flexDir="column"
        justify={{ base: 'center', md: 'start' }}
        alignItems={{ base: 'start' }}
        gap="0.2rem"
      >
        {/*---------------- Student Name --------------*/}
        <Text fontWeight="extrabold" fontSize="2xl" color="gray.800">
          {studentProfile?.name}
        </Text>

        {/*---------------- Registration Date --------------*/}
        <Flex alignItems="center" gap="2">
          <FiCalendar />
          {typeof studentProfile?.student.registrationDate === 'string' &&
            convertToGermanDate(studentProfile?.student.registrationDate)}
        </Flex>

        {/*---------------- Email --------------*/}
        <Flex alignItems="center" gap="2">
          <FiMail />
          <Link
            target="_blank"
            href={`mailto:${studentProfile?.student.email}`}
            color="gray.800"
            _dark={{ color: 'white' }}
          >
            {studentProfile?.student.email}
          </Link>
        </Flex>
        {/*---------------- LinkedIn & Xing Business Links--------------*/}
        <Flex gap="0.8rem" mt="1">
          {studentProfile?.linkedinUrl && (
            <Link
              target="_blank"
              fontSize={{ base: '1.2rem', md: '1.4rem' }}
              href={studentProfile?.linkedinUrl}
            >
              <FaLinkedin />
            </Link>
          )}

          {studentProfile?.xingUrl && (
            <Link
              fontSize={{ base: '1.2rem', md: '1.4rem' }}
              target="_blank"
              href={studentProfile?.xingUrl}
            >
              <FaXingSquare />
            </Link>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export { View };
