import { Avatar, Flex, Link, Text } from '@chakra-ui/react';
import { convertToGermanDate } from '../../../../utils/helpers';
import { useStudentStore } from '../../../../sotres';
import { FiCalendar, FiMail } from 'react-icons/fi';
import { FaLinkedin, FaXingSquare } from 'react-icons/fa';
import { PiStudent } from 'react-icons/pi';
import { BoxWrapper } from '../../../../components';

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
        gap="1rem"
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

          {/*---------------- Registration Date --------------*/}
          <Flex alignItems="center" gap="2">
            {studentProfile?.courseOfStudy && (
              <>
                <PiStudent /> {studentProfile?.courseOfStudy}
              </>
            )}
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
        </Flex>
        {/*---------------- LinkedIn & Xing Business Links--------------*/}

        <Flex gap="0.8rem" fontWeight="500" alignItems="start" flexDir={{ md: 'column' }}>
          {studentProfile?.linkedinUrl && (
            <Link
              display="flex"
              alignItems="center"
              gap="0.2rem"
              target="_blank"
              href={studentProfile?.linkedinUrl}
            >
              Linkedin <FaLinkedin />
            </Link>
          )}

          {studentProfile?.xingUrl && (
            <Link
              display="flex"
              alignItems="center"
              gap="0.2rem"
              target="_blank"
              href={studentProfile?.xingUrl}
            >
              Xing <FaXingSquare />
            </Link>
          )}
        </Flex>
      </Flex>
    </BoxWrapper>
  );
}

export { View };
