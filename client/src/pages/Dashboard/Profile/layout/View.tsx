import { Avatar, Flex, Link, Text } from '@chakra-ui/react';
import { convertToGermanDate } from '../../../../utils/formatters.ts';
import { useStudentStore } from '../../../../stores/index.tsx';
import { BoxWrapper } from '../../../../components/shared/index.ts';
import { MdEmail } from 'react-icons/md';
import {
  FaCalendarAlt,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaXingSquare
} from 'react-icons/fa';

function View() {
  const { studentProfile } = useStudentStore();

  return (
    <BoxWrapper
      pos="relative"
      overflow="hidden"
      _before={{
        content: '""',
        bg: 'linear-gradient(90deg,#1896b0 ,#9671eb)',
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: 'full',
        height: '5px'
      }}
    >
      <Flex
        color="teal.500"
        _dark={{ color: 'teal.300' }}
        gap={{ base: '1rem', md: '2rem' }}
        flexWrap="wrap"
        justifyContent="start"
        alignItems="end"
      >
        {/*---------------- Profile Image -------------*/}
        <Avatar
          src={studentProfile?.profileImage?.url}
          size={{ base: 'xl', lg: '2xl' }}
          borderRadius="md"
        />

        <Flex flexDir="column" alignItems="start" gap="0.2rem" flexWrap="wrap">
          {/*---------------- Student Name --------------*/}
          <Text fontWeight="extrabold" fontSize="2xl" color="gray.800">
            {studentProfile?.name}
          </Text>

          {/*---------------- Registration Date --------------*/}
          <Flex alignItems="center" gap="2">
            <FaCalendarAlt />
            {typeof studentProfile?.student.registrationDate === 'string' &&
              convertToGermanDate(studentProfile?.student.registrationDate)}
          </Flex>

          {/*---------------- Registration Date --------------*/}
          <Flex alignItems="center" gap="2">
            <FaGraduationCap />
            {studentProfile?.courseOfStudy ? studentProfile?.courseOfStudy : '-'}
          </Flex>

          {/*---------------- Email --------------*/}
          <Flex alignItems="center" gap="2">
            <FaMapMarkerAlt />
            {studentProfile?.location ? studentProfile?.location : '-'}
          </Flex>
        </Flex>
        {/*---------------- LinkedIn & Xing Business Links--------------*/}

        <Flex flexDir="column" gap="0.2rem" flexWrap="wrap">
          {/*---------------- Email --------------*/}
          <Link
            display="flex"
            alignItems="center"
            gap="2"
            target="_blank"
            href={`mailto:${studentProfile?.student.email}`}
          >
            <MdEmail /> {studentProfile?.student.email}
          </Link>

          {studentProfile?.linkedinUrl && (
            <Link
              display="flex"
              alignItems="center"
              gap="2"
              target="_blank"
              href={studentProfile?.linkedinUrl}
            >
              <FaLinkedin /> Linkedin
            </Link>
          )}

          {studentProfile?.xingUrl && (
            <Link
              display="flex"
              alignItems="center"
              gap="2"
              target="_blank"
              href={studentProfile?.xingUrl}
            >
              <FaXingSquare /> Xing
            </Link>
          )}
        </Flex>
      </Flex>
    </BoxWrapper>
  );
}

export { View };
