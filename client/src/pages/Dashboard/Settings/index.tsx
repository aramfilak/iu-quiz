import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Tooltip,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import {
  FaEye,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaUser,
  FaXing
} from 'react-icons/fa';
import { FiMoon, FiSave, FiSun, FiUserX } from 'react-icons/fi';
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

function Settings() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const linkedInInputRef = useRef<HTMLInputElement>(null);
  const xingInputRef = useRef<HTMLInputElement>(null);
  const courseOfStudySelectRef = useRef<HTMLSelectElement>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { studentProfile, updateStudent } = useStudentStore();
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleInputChange = () => {
    const inputs: boolean[] = [
      nameInputRef.current?.value.trim() !== (studentProfile?.name || ''),
      locationInputRef.current?.value.trim() !== (studentProfile?.location || ''),
      linkedInInputRef.current?.value.trim() !== (studentProfile?.linkedinUrl || ''),
      xingInputRef.current?.value.trim() !== (studentProfile?.xingUrl || ''),
      courseOfStudySelectRef.current?.value.trim() !==
        (studentProfile?.courseOfStudy || '')
    ];

    setIsChanged(inputs.some((input) => input));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameInputRef.current?.value;
    const location = locationInputRef.current?.value;
    const linkedinUrl = linkedInInputRef.current?.value;
    const xingUrl = xingInputRef.current?.value;
    const courseOfStudy = courseOfStudySelectRef.current?.value;

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

    if (success) {
      setIsChanged(false);
    }

    setIsSubmitting(false);
  };

  return (
    <>
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
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  onChange={handleInputChange}
                  ref={nameInputRef}
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
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  onChange={handleInputChange}
                  ref={locationInputRef}
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
                  onChange={handleInputChange}
                  ref={courseOfStudySelectRef}
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
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="teal.500"
                  onChange={handleInputChange}
                  ref={linkedInInputRef}
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
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  borderColor="teal.500"
                  onChange={handleInputChange}
                  ref={xingInputRef}
                  autoComplete="on"
                  placeholder="https://www.xing.com/profile"
                  defaultValue={studentProfile?.xingUrl || ''}
                />
              </InputGroup>
            </BoxWrapper>
          </Flex>

          {/*------------------- Color Mode --------------------*/}
          <BoxWrapper flexDir="row" width="full">
            <HStack align="end">
              <Button
                variant="outline"
                leftIcon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? 'Dunkelmodus' : 'Hellermodus'}
              </Button>
            </HStack>
            {/*------------------- Save Button -----------------*/}
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
              Prview Profile
            </Button>
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
