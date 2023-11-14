import './style.scss';
import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  attributes?: HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  additionalClasses?: string[];
  fullScreen?: boolean;
}
function PageView({ children, attributes, additionalClasses, fullScreen }: Props) {
  if (fullScreen) {
    additionalClasses?.push('full-screen');
  }

  const pageViewClassNames = classNames('page-view', additionalClasses);

  return (
    <div className={pageViewClassNames} {...attributes}>
      {children}
    </div>
  );
}

export { PageView };
