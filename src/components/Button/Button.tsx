import * as React from 'react';
import { cx } from '../../utils';

interface IProps {
  onClick: () => void;
  className?: string;
  type?: 'primary' | 'danger';
}

const Button = ({ children, onClick, className, type }: React.PropsWithChildren<IProps>) => {
  return (
    <div className={cx('button', className, type && `button--${type}`)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
