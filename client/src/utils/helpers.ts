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

function generateRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffleArray<T>(array: Array<T>): Array<T> {
  for (let i = 0; i < array.length; i++) {
    const rand = generateRandomInt(0, array.length - 1);

    [array[i], array[rand]] = [array[rand], array[i]];
  }

  return array;
}

export { scorePositionColor, validateFeedback, parseJsonDataFromFormData, shuffleArray };
