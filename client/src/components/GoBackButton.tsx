import { Button, ButtonProps } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function GoBackButton(rest: ButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      {...rest}
      mb="4"
      leftIcon={<FaArrowLeft />}
      onClick={() => navigate(-1)}
    >
      Zurück
    </Button>
  );
}

export { GoBackButton };
