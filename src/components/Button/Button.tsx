import * as React from 'react';
import { cx } from '../../utils';

interface IProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'primary' | 'danger';
}

const Button = ({ children, onClick, disabled, className, type }: React.PropsWithChildren<IProps>) => {
  return (
    <div
      className={cx('button', className, type && `button--${type}`, disabled && 'button--disabled')}
      onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
