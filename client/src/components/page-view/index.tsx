import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  attributes?: HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  additionalClasses?: string[];
}
function PageView({ children, attributes, additionalClasses }: Props) {
  const pageViewClassNames = classNames('page-view', additionalClasses);

  return (
    <div className={pageViewClassNames} {...attributes}>
      {children}
    </div>
  );
}

export { PageView };
