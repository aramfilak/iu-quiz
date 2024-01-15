import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import { useGamePlayStore, useQuizStore } from '../../../stores';
import { convertSecondsToMin } from '../../../utils/formatters';
import { BoxWrapper, CustomAlertDialog, IconBox } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaClock, FaThList } from 'react-icons/fa';

function PlayQuizHeader() {
  const currentQuestionIndex = useGamePlayStore((state) => state.currentQuestionIndex);
  const resetStore = useGamePlayStore((state) => state.resetStore);
  const duration = useGamePlayStore((state) => state.duration);
  const activeQuiz = useQuizStore((state) => state.activeQuiz);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const navigate = useNavigate();

  if (!activeQuiz) return null;

  return (
    <BoxWrapper
      w="full"
      as="header"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {/*__________________ End Game Dialog ______________*/}
      <CustomAlertDialog
        onClose={onClose}
        isOpen={isOpen}
        title="Das Spiel beenden"
        description="Sind Sie sicher, dass Sie das Spiel beenden wollen? Wenn Sie dies bestätigen, wird Ihr Punktestand nicht in die Punktetabelle eingetragen."
        onSubmit={() => {
          resetStore();
          navigate(-1);
        }}
        submitButtonLabel="Beenden"
      />

      <Heading color="teal" as="h3" size="md">
        <IconBox leftIcon={<FaThList />}>
          {`Frage ${currentQuestionIndex + 1} von ${activeQuiz.size}`}
        </IconBox>
      </Heading>

      <Heading color="teal" as="h3" size="md">
        <IconBox leftIcon={<FaClock />}>{`${convertSecondsToMin(duration)}`}</IconBox>
      </Heading>

      <Button
        leftIcon={<FaSignOutAlt />}
        onClick={onOpen}
        variant="outline"
        colorScheme="red"
      >
        Beenden
      </Button>
    </BoxWrapper>
  );
}

export { PlayQuizHeader };
