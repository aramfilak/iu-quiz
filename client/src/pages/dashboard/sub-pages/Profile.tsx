import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Divider,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FiUserCheck, FiSave, FiMail } from 'react-icons/fi';
import { useStudentStore } from '../../../sotres';
import { PageHeader, UploadProfileImage } from '../../../components';
import profileIllustration from '../../../assets/illustrations/profile-illustration.svg';
import { CustomAlert } from '../../../utils/types';

function Profile() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const nickNameInputRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { student, updateStudent } = useStudentStore();
  const [alert, setAlert] = useState<CustomAlert | null>(null);

  const handelChange = () => {
    const nickNameCurrentValue = nickNameInputRef.current?.value;
    const nickNameDefaultValue = nickNameInputRef.current?.defaultValue;

    if (nickNameCurrentValue !== nickNameDefaultValue) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nickName = nickNameInputRef.current?.value;

    if (!nickName) {
      setAlert({ status: 'warning', message: 'Bitte alle Felder ausfüllen' });
    }

    setAlert({ status: 'loading', message: 'Es lädt...' });

    const { success, message } = await updateStudent({ nickName });

    setAlert({ status: success ? 'success' : 'error', message: message });

    if (success) {
      setIsChanged(false);
    }
    setIsSubmitting(false);
  };

  return (
    <Box>
      {/*------------------- Header --------------------*/}
      <PageHeader
        title={`${student?.nickName} Profil`.toUpperCase()}
        description="Dein Profil, deine Geschichte. Gestalte es einzigartig."
      />
      <Box
        display="flex"
        flexDir={{ base: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            {/*------------------- Response Alert --------------------*/}
            {alert && (
              <Alert borderRadius="md" status={alert.status} mb="3">
                <AlertIcon />
                {alert.message}
              </Alert>
            )}
            {/*---------------- Upload Image -------------*/}
            <UploadProfileImage />
            {/*------------------- Email --------------------*/}
            <Box width="100%">
              <FormLabel mt="2" htmlFor="email" m="0" color="gray.500">
                Email
              </FormLabel>
              <InputGroup>
                <Input
                  onChange={() => setIsChanged(true)}
                  ref={nickNameInputRef}
                  borderColor="teal.700"
                  autoComplete="on"
                  id="nick-name"
                  placeholder="max muster"
                  disabled={true}
                  defaultValue={student?.email}
                />
                <InputLeftElement color="gray.500">
                  <FiMail />
                </InputLeftElement>
              </InputGroup>
            </Box>
            {/*------------------- Nick Name --------------------*/}
            <Box width="100%">
              <FormLabel mt="2" htmlFor="nick-name" m="0">
                Nickname
              </FormLabel>
              <InputGroup>
                <Input
                  onChange={handelChange}
                  ref={nickNameInputRef}
                  borderColor="teal.700"
                  autoComplete="on"
                  id="nick-name"
                  placeholder="max muster"
                  defaultValue={student?.nickName}
                />
                <InputLeftElement>
                  <FiUserCheck />
                </InputLeftElement>
              </InputGroup>
            </Box>

            {/*------------------- Form Submit -----------------*/}
            <Divider />
            <Button
              width={{ base: '100%' }}
              alignSelf={{ md: 'end' }}
              colorScheme="teal"
              type="submit"
              disabled={isSubmitting}
              isDisabled={!isChanged}
              leftIcon={<FiSave />}
            >
              Speichern
            </Button>
          </Box>
        </form>

        <Image maxW="27rem" src={profileIllustration} alt={'profile Illustration'} />
      </Box>
    </Box>
  );
}

export { Profile };
