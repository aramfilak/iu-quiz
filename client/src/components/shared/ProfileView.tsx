import { Avatar, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import {
  FaCalendarAlt,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaXingSquare
} from 'react-icons/fa';
import { BoxWrapper, IconBox } from '.';
import { StudentProfile } from '../../utils/types';
import { convertToGermanDate } from '../../utils/formatters.ts';

function ProfileView(studentProfile: StudentProfile) {
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
      <Flex gap="4">
        {/*---------------- Profile Image -------------*/}
        <Avatar
          src={studentProfile.profileImage?.url}
          size={{ base: 'lg', lg: 'xl' }}
          borderRadius="md"
        />
        <VStack align="start">
          {/*---------------- Student Name --------------*/}
          <Text fontWeight="extrabold" fontSize="2xl" color="gray.800">
            {studentProfile?.name}
          </Text>
          {/*---------------- Registration Date --------------*/}
          <IconBox leftIcon={<FaCalendarAlt />}>
            <Text>
              {typeof studentProfile?.student.registrationDate === 'string' &&
                convertToGermanDate(studentProfile?.student.registrationDate)}
            </Text>
          </IconBox>
        </VStack>
      </Flex>
      <Flex wrap="wrap" gap="4">
        {/*---------------- Email --------------*/}
        <IconBox
          leftIcon={<MdEmail />}
          color={studentProfile?.student.email ? 'teal.500' : undefined}
        >
          <Link
            display="flex"
            alignItems="center"
            gap="2"
            target="_blank"
            href={`mailto:${studentProfile?.student.email}`}
          >
            {studentProfile?.student.email}
          </Link>
        </IconBox>
        {/*---------------- courseOfStudy --------------*/}
        <IconBox leftIcon={<FaGraduationCap />}>
          <Text>{studentProfile?.courseOfStudy || '-'}</Text>
        </IconBox>

        {/*---------------- Email --------------*/}

        <IconBox leftIcon={<FaMapMarkerAlt />}>
          <Text>{studentProfile?.location || '-'}</Text>
        </IconBox>

        {/*---------------- LinkedIn & Xing Business Links--------------*/}

        <IconBox
          leftIcon={<FaLinkedin />}
          color={studentProfile?.linkedinUrl ? 'teal.500' : undefined}
        >
          {(studentProfile?.linkedinUrl && (
            <Link
              display="flex"
              alignItems="center"
              gap="2"
              target="_blank"
              href={studentProfile?.linkedinUrl}
            >
              Linkedin
            </Link>
          )) ||
            '-'}
        </IconBox>

        <IconBox
          leftIcon={<FaXingSquare />}
          color={studentProfile?.xingUrl ? 'teal.500' : undefined}
        >
          {(studentProfile?.xingUrl && (
            <Link
              display="flex"
              alignItems="center"
              gap="2"
              target="_blank"
              href={studentProfile?.xingUrl}
            >
              Xing
            </Link>
          )) ||
            '-'}
        </IconBox>
      </Flex>
    </BoxWrapper>
  );
}

export { ProfileView };
