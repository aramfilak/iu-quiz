import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  Button,
  DrawerHeader
} from '@chakra-ui/react';
import { Quiz } from '../../utils/types';
import { PlayQuizBody } from './PlayQuizBody';
import { useState } from 'react';

interface PlayQuizProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz;
}

function PlayQuiz({ onClose, isOpen, quiz }: PlayQuizProps) {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{`Frage ${currentQuestionNumber} von ${quiz.size}`}</DrawerHeader>
        <PlayQuizBody />
        <DrawerFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Zurück
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionNumber((prv) => prv + 1)}
          >
            Überprüfen
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { PlayQuiz };
