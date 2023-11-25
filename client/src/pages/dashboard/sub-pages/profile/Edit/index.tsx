import {
  Alert,
  AlertIcon,
  InputGroup,
  Input,
  Button,
  useDisclosure,
  Select,
  InputLeftAddon,
  Heading,
  Tooltip,
  Flex
} from '@chakra-ui/react';
import { UploadProfileImage, BoxWrapper } from '../../../../../components';
import { useState, useRef } from 'react';
import { useStudentStore } from '../../../../../sotres';
import { CustomAlert } from '../../../../../utils/types';
import courseOfStudy from '../../../../../data/courseOfStudy.json';
import { FiSave, FiUserX } from 'react-icons/fi';
import { FaLinkedin, FaXing, FaGraduationCap, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { DeleteStudentAlert } from './DeleteStudentAlert';

function Edit() {
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

  const handelChange = () => {
    const nameIsChanged = nameInputRef.current?.value.trim() !== studentProfile?.name;

    const locationIsChanged = locationInputRef.current?.value.trim() !== studentProfile?.location;

    const linkedInUrlIsChanged =
      linkedInInputRef.current?.value.trim() !== studentProfile?.linkedinUrl;

    const xingUrlIsChanged = xingInputRef.current?.value.trim() !== studentProfile?.xingUrl;

    const courseOfStudyIsChanged =
      courseOfStudySelectRef.current?.value.trim() !== studentProfile?.courseOfStudy;

    if (
      nameIsChanged ||
      locationIsChanged ||
      xingUrlIsChanged ||
      courseOfStudyIsChanged ||
      linkedInUrlIsChanged
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameInputRef.current?.value;
    const location = locationInputRef.current?.value;
    const linkedinUrl = linkedInInputRef.current?.value;
    const xingUrl = xingInputRef.current?.value;
    const courseOfStudy = courseOfStudySelectRef.current?.value;

    if (!name) {
      setAlert({ status: 'warning', message: 'Name ist ein Pflichtfeld' });
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
      <DeleteStudentAlert isOpen={isOpen} onClose={onClose} />

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

          <BoxWrapper w="100%">
            <Heading as="h3" fontSize="sm" mb="2">
              Profil Bild
            </Heading>
            <UploadProfileImage />
          </BoxWrapper>

          {/*------------------- General Data --------------------*/}
          <Flex flexDir={{ base: 'column', md: 'row' }} gap="1rem" width="100%">
            <BoxWrapper flex="1">
              <Heading as="h3" fontSize="sm">
                Allgemein
              </Heading>
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
                  onChange={handelChange}
                  ref={nameInputRef}
                  borderColor="teal.500"
                  autoComplete="on"
                  id="nick-name"
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
                  onChange={handelChange}
                  ref={locationInputRef}
                  borderColor="teal.500"
                  autoComplete="on"
                  id="location"
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
                  onChange={handelChange}
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

            <BoxWrapper flex="1">
              <Heading as="h3" fontSize="sm">
                Verbindungslinks
              </Heading>
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
                  onChange={handelChange}
                  ref={linkedInInputRef}
                  autoComplete="on"
                  id="linkedin"
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
                  onChange={handelChange}
                  ref={xingInputRef}
                  autoComplete="on"
                  id="linkedin"
                  placeholder="https://www.xing.com/profile"
                  defaultValue={studentProfile?.xingUrl || ''}
                />
              </InputGroup>
            </BoxWrapper>
          </Flex>

          <BoxWrapper width="100%">
            {/*------------------- Save Button -----------------*/}

            <Button
              alignSelf="end"
              width={{ base: '100%', sm: 'fit-content' }}
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
          <BoxWrapper width="100%" border="2px dashed" borderColor="red.600">
            <Heading as="h3" fontSize="sm">
              Gefahrenzone
            </Heading>
            <Button
              width={{ base: '100%', sm: 'fit-content' }}
              colorScheme="red"
              type="button"
              disabled={isSubmitting}
              onClick={onOpen}
              leftIcon={<FiUserX />}
            >
              Profile Löschen
            </Button>
          </BoxWrapper>
        </Flex>
      </form>
    </>
  );
}

export { Edit };
