import './style.scss';
import classNames from 'classnames';
import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  attributes?: HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  additionalClasses?: string[];
}
function Container({ children, attributes, additionalClasses }: Props) {
  const containerClassNames = classNames('container', additionalClasses);

  return (
    <div className={containerClassNames} {...attributes}>
      {children}
    </div>
  );
}

export { Container };
