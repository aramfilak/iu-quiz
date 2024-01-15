import { Button } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useGamePlayStore, useQuizStore } from '../../../stores';
import { BoxWrapper } from '../../../components';

function PlayQuizFooter() {
  const handleNavigation = useGamePlayStore((state) => state.handleNavigation);
  const startTimeout = useGamePlayStore((state) => state.startTimeout);
  const intervalId = useGamePlayStore((state) => state.intervalId);
  const activeQuiz = useQuizStore((state) => state.activeQuiz);

  if (!activeQuiz) return null;

  return (
    <BoxWrapper w="full" flexDir="row" justifyContent="center">
      {intervalId ? (
        <>
          {/*_________________________ Next Button _____________________*/}
          <Button
            leftIcon={<FaArrowLeft />}
            colorScheme="blue"
            onClick={() => handleNavigation('previous', activeQuiz.size)}
          >
            Vorherige
          </Button>

          {/*_________________________ Previous Button _____________________*/}
          <Button
            leftIcon={<FaArrowRight />}
            colorScheme="blue"
            onClick={() => {
              handleNavigation('next', activeQuiz.size);
            }}
          >
            Nächste
          </Button>
        </>
      ) : (
        <Button onClick={() => startTimeout()}>Spiel starten</Button>
      )}
    </BoxWrapper>
  );
}

export { PlayQuizFooter };
