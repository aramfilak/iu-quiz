import { createStandaloneToast } from '@chakra-ui/react';

function scorePositionColor(index: number, isDarkMode = false) {
  const positionColorLightMode =
    index === 0
      ? 'yellow.500'
      : index === 1
        ? 'gray.400'
        : index === 2
          ? 'yellow.600'
          : 'gray.700';

  const positionColorDarkMode =
    index === 0
      ? 'yellow.500'
      : index === 1
        ? 'gray.400'
        : index === 2
          ? 'yellow.600'
          : 'gray.50';

  return isDarkMode ? positionColorDarkMode : positionColorLightMode;
}

function resultShades(progress: number) {
  if (progress <= 50) {
    return 'red.400';
  } else if (progress < 61) {
    return 'red.200';
  } else if (progress < 76) {
    return 'yellow.400';
  } else if (progress < 81) {
    return 'green.200';
  } else {
    return 'green.400';
  }
}

function validateFeedback(feedback: string) {
  const toastWarning = (message: string) => {
    const { toast } = createStandaloneToast();

    toast({
      status: 'warning',
      description: message,
      position: 'top'
    });
  };

  feedback = feedback.trim();

  if (!feedback) {
    return toastWarning('Feedback darf nicht leer sein');
  } else if (feedback.length < 2) {
    return toastWarning('Feedback muss mindestens 2 Zeichen lang sein');
  } else if (feedback.length > 500) {
    return toastWarning('Feedback darf nicht länger als 500 Zeichen sein');
  } else {
    return feedback;
  }
}

function parseJsonDataFromFormData<T>(e: React.FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.target as HTMLFormElement);
  const formJson = Object.fromEntries(formData.entries()) as T;

  return formJson;
}

function shuffleArray<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export {
  scorePositionColor,
  validateFeedback,
  parseJsonDataFromFormData,
  resultShades,
  shuffleArray
};
