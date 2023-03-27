import * as React from 'react';

interface IProps {
  onClick: () => void;
  className?: string;
}

const Button = ({ children, onClick, className }: React.PropsWithChildren<IProps>) => {
  return (
    <div className={`button ${className ?? ''}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
