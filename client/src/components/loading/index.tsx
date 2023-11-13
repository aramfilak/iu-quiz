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
      <h1>Es Lädt</h1>
      <div className="circles">
        <span className="circle-1"></span>
        <span className="circle-2"></span>
        <span className="circle-3"></span>
      </div>
    </Container>
  );
}

export { Loading };
