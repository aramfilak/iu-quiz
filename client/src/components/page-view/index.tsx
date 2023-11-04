import { ReactNode } from 'react';
import './style.scss';

function PageView({ children }: { children: ReactNode }) {
  return <div className="page-view">{children}</div>;
}

export default PageView;
