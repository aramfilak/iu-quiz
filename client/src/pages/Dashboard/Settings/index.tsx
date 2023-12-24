import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  FaEye,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaUser,
  FaXing
} from 'react-icons/fa';
import { FiSave, FiUserX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  BoxWrapper,
  DeleteStudentAlertDialog,
  UploadProfileImage
} from '../../../components';
import courseOfStudy from '../../../data/courseOfStudy.json';
import { useStudentStore } from '../../../stores';
import { routes } from '../../../utils/routes';
import { CustomAlert } from '../../../utils/types';
import { PageHeader } from '../../../components';
import { parseJsonDataFromFormData } from '../../../utils/helpers';

interface FormType {
  name: string;
  location: string;
  linkedinUrl: string;
  xingUrl: string;
  courseOfStudy: string;
}

function Settings() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const updateStudent = useStudentStore((state) => state.updateStudent);
  const studentProfile = useStudentStore((state) => state.studentProfile);
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, location, linkedinUrl, xingUrl, courseOfStudy } =
      parseJsonDataFromFormData<FormType>(e);

    if (!name) {
      return setAlert({ status: 'warning', message: 'Name ist ein Pflichtfeld' });
    }

    setAlert({ status: 'loading', message: 'Es lädt...' });

    const { success, message } = await updateStudent({
      name,
      location,
      linkedinUrl,
      xingUrl,
      courseOfStudy
    });

    setAlert({ status: success ? 'success' : 'error', message: message });

    setIsSubmitting(false);
  };

  return (
    <>
      <PageHeader
        title="Einstellungen"
        description="Dein Profil. Deine Geschichte. Gestalte es einzigartig."
      />
      {/*------------------- Alert Dialog --------------------*/}
      <DeleteStudentAlertDialog isOpen={isOpen} onClose={onClose} />

      {/*------------------- Alert  --------------------*/}
      {alert && (
        <Alert status={alert.status} mb="4">
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        {/*------------------- Response Alert --------------------*/}
        <Flex flexDir={{ base: 'column', sm: 'row' }} flexWrap="wrap" gap="1rem">
          {/*---------------- Upload Image -------------*/}

          <BoxWrapper w="100%" title="Profil Bild">
            <UploadProfileImage />
            {/*------------------- Dark Mode Switcher -----------------*/}
          </BoxWrapper>

          {/*------------------- General Data --------------------*/}
          <Flex flexDir={{ base: 'column', md: 'row' }} gap="1rem" width="100%">
            <BoxWrapper flex="1" title="Allgemein">
              {/*------------------- Nick Name --------------------*/}
              <InputGroup>
                <Tooltip label="Name">
                  <InputLeftAddon>
                    <FaUser />
                  </InputLeftAddon>
                </Tooltip>
                <Input
                  name="name"
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="teal.500"
                  autoComplete="on"
                  placeholder="Name"
                  defaultValue={studentProfile?.name}
                />
              </InputGroup>

              {/*------------------- Location --------------------*/}

              <InputGroup>
                <Tooltip label="Ort">
                  <InputLeftAddon>
                    <FaMapMarkerAlt />
                  </InputLeftAddon>
                </Tooltip>
                <Input
                  name="location"
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="teal.500"
                  autoComplete="on"
                  placeholder="Wohnort"
                  defaultValue={studentProfile?.location || ''}
                />
              </InputGroup>

              {/*------------------- Course Of Study --------------------*/}
              <InputGroup>
                <Tooltip label="Studiengang">
                  <InputLeftAddon>
                    <FaGraduationCap />
                  </InputLeftAddon>
                </Tooltip>
                <Select
                  name="courseOfStudy"
                  placeholder="Studiengang nicht anzeigen"
                  defaultValue={studentProfile?.courseOfStudy || ''}
                >
                  {courseOfStudy.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </BoxWrapper>

            {/*------------------- Connection Links --------------------*/}

            <BoxWrapper flex="1" title="Verbindungslinks">
              {/*------------------- Linkedin --------------------*/}
              <InputGroup>
                <Tooltip label="Linkedin">
                  <InputLeftAddon>
                    <FaLinkedin />
                  </InputLeftAddon>
                </Tooltip>
                <Input
                  name="linkedinUrl"
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="teal.500"
                  autoComplete="on"
                  placeholder="https://www.linkedin.com/profil"
                  defaultValue={studentProfile?.linkedinUrl || ''}
                />
              </InputGroup>

              {/*------------------- Xing --------------------*/}
              <InputGroup>
                <Tooltip label="Xing">
                  <InputLeftAddon>
                    <FaXing />
                  </InputLeftAddon>
                </Tooltip>
                <Input
                  name="xingUrl"
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="teal.500"
                  autoComplete="on"
                  placeholder="https://www.xing.com/profile"
                  defaultValue={studentProfile?.xingUrl || ''}
                />
              </InputGroup>
            </BoxWrapper>
          </Flex>

          <BoxWrapper flexDir="row" width="full">
            {/*------------------- Preview Profile -----------------*/}
            <Button
              marginLeft="auto"
              colorScheme="blue"
              leftIcon={<FaEye />}
              onClick={() =>
                navigate(
                  `../${routes.Dashboard.children.Profile.mainPath}/${studentProfile?.studentId}`
                )
              }
            >
              Preview Profile
            </Button>
            {/*------------------- Save Button -----------------*/}
            <Button
              alignSelf="end"
              colorScheme="teal"
              type="submit"
              disabled={isSubmitting}
              leftIcon={<FiSave />}
            >
              Speichern
            </Button>
          </BoxWrapper>
          {/*------------------- Delete Profile -----------------*/}
          <BoxWrapper
            title="Gefahrenzone"
            width="100%"
            border="2px dashed"
            borderColor="red.600"
          >
            <Button
              width={{ base: '100%', sm: 'fit-content' }}
              colorScheme="red"
              type="button"
              disabled={isSubmitting}
              onClick={onOpen}
              leftIcon={<FiUserX />}
            >
              Konto Löschen
            </Button>
          </BoxWrapper>
        </Flex>
      </form>
    </>
  );
}

export { Settings };
