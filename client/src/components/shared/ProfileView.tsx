import { Avatar, Flex, Link, VStack } from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import {
  FaCalendarAlt,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaUser,
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
      <Flex gap="8" flexWrap="wrap">
        <Flex gap="4">
          {/*---------------- Profile Image -------------*/}
          <Avatar
            src={studentProfile.profileImage?.url}
            w={{ base: '5.5rem', md: '6rem' }}
            h={{ base: '5.5rem', md: '6rem' }}
            borderRadius="md"
          />
          <VStack align="start">
            {/*---------------- Student Name --------------*/}
            <IconBox leftIcon={<FaUser />} fontWeight="extrabold" color="gray.800">
              {studentProfile?.name}
            </IconBox>
            {/*---------------- Registration Date --------------*/}
            <IconBox leftIcon={<FaCalendarAlt />}>
              {typeof studentProfile?.student.registrationDate === 'string' &&
                convertToGermanDate(studentProfile?.student.registrationDate)}
            </IconBox>

            {/*---------------- Email --------------*/}
            <IconBox leftIcon={<MdEmail />}>
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
          </VStack>
        </Flex>

        <VStack align="start" flexDir={{ base: 'row', md: 'column' }}>
          {/*---------------- courseOfStudy --------------*/}
          <IconBox leftIcon={<FaGraduationCap />}>
            {studentProfile?.courseOfStudy || '-'}
          </IconBox>

          {/*---------------- Email --------------*/}

          <IconBox leftIcon={<FaMapMarkerAlt />}>
            {studentProfile?.location || '-'}
          </IconBox>

          <Flex gap="4">
            {/*---------------- LinkedIn & Xing Business Links--------------*/}
            <IconBox leftIcon={<FaLinkedin />}>
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

            <IconBox leftIcon={<FaXingSquare />}>
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
        </VStack>
      </Flex>
    </BoxWrapper>
  );
}

export { ProfileView };
