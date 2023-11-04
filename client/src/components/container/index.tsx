import './style.scss';
import { HTMLAttributes, ReactNode } from 'react';

interface Props {
  attributes?: HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
}
function Container({ children, attributes }: Props) {
  return (
    <div className="container" {...attributes}>
      {children}
    </div>
  );
}

export default Container;
