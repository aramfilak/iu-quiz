import {
  Box,
  Text,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Image,
  Divider
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FiUserCheck, FiSave, FiMail } from 'react-icons/fi';
import { useStudentStore } from '../../../sotres';
import { UploadProfileImage } from '../../../components';
import profileIllustration from '../../../assets/illustrations/profile-illustration.svg';

function Profile() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const nickNameInputRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { student, updateStudent } = useStudentStore();
  const toast = useToast();

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
      toast({ status: 'warning', description: 'Bitte alle Felder ausfüllen' });
    }

    const isLoading = toast({ status: 'loading', description: 'Es lädt...' });

    const { success, message } = await updateStudent({ nickName });

    toast.close(isLoading);

    toast({ status: success ? 'success' : 'error', description: message });

    if (success) {
      setIsChanged(false);
    }
    setIsSubmitting(false);
  };

  return (
    <Box>
      <Text fontWeight="bold" fontSize="3xl" mb="0.2 rem">
        {`${student?.nickName} Profil`.toUpperCase()}
      </Text>
      <Text color="gray.600">Dein Profil, deine Geschichte. Gestalte es einzigartig.</Text>
      <Box
        gap="1rem"
        maxW="70rem"
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        mt="2rem"
      >
        <form onSubmit={handleSubmit}>
          <Box
            maxW="20rem"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
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
              alignSelf="end"
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
