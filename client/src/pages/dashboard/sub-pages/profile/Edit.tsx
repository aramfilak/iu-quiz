import {
  Alert,
  AlertIcon,
  InputGroup,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  Select,
  InputLeftAddon,
  Heading,
  Tooltip,
  Flex
} from '@chakra-ui/react';
import { UploadProfileImage, BoxWrapper } from '../../../../components';
import { useState, useRef } from 'react';
import { useStudentStore, usePersistStore } from '../../../../sotres';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../utils/routes';
import { CustomAlert } from '../../../../utils/types';
import courseOfStudy from '../../../../data/courseOfStudy.json';
import { FiAlertTriangle, FiSave, FiUserX } from 'react-icons/fi';
import { FaLinkedin, FaXing, FaGraduationCap, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

function Edit() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const linkedInInputRef = useRef<HTMLInputElement>(null);
  const xingInputRef = useRef<HTMLInputElement>(null);
  const courseOfStudySelectRef = useRef<HTMLSelectElement>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { studentProfile, updateStudent, deleteStudent } = useStudentStore();
  const { setAccessToken, setIsAuthenticated } = usePersistStore();
  const [alert, setAlert] = useState<CustomAlert | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const navigate = useNavigate();

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

  const handleDeleteStudentProfile = async () => {
    const loading = toast({ status: 'loading', description: 'Es lädt...', duration: 60 * 1000 });

    const { success, message } = await deleteStudent();

    toast.close(loading);

    toast({ status: success ? 'success' : 'error', description: message });

    setAccessToken(null);
    setIsAuthenticated(false);
    navigate(routes.Authentication.path);
    setIsSubmitting(false);
  };

  return (
    <>
      {/*------------------- Alert Dialog --------------------*/}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader
            color="red.500"
            fontSize="3.5rem"
            display="flex"
            justifyContent="center"
          >
            <FiAlertTriangle />
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Möchten Sie Ihr Profil wirklich löschen? Diese Aktion kann nicht rückgängig gemacht
            werden und führt zum Verlust aller Ihrer gespeicherten Daten und Einstellungen.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Abbrechen
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteStudentProfile}>
              Löschen
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
              Profile Bild
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
                  borderColor="teal.700"
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
                  borderColor="teal.700"
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
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                  ref={courseOfStudySelectRef}
                  placeholder="Studiengang nicht anzeigen"
                  defaultValue={studentProfile?.courseOfStudy || ''}
                >
                  {courseOfStudy.map(({ name, careId }) => (
                    <option key={careId} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>{' '}
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
                  borderColor="teal.700"
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
                  borderColor="teal.700"
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
