import { Spinner } from '@chakra-ui/react';
import { Container } from '../container';
import './style.scss';

interface Props {
  fullScreen?: boolean;
}

function Loading({ fullScreen }: Props) {
  const classNames = ['loader'];

  if (fullScreen) {
    classNames.push('full-screen');
  }

  return (
    <Container additionalClasses={classNames}>
      <h1>Es lädt</h1>
      <Spinner size="lg" color="teal.500" />
    </Container>
  );
}

export { Loading };
