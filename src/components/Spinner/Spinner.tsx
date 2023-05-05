import * as React from 'react';

interface IProps {
  size?: string;
  className?: string;
}

const Spinner = ({ size, className }: IProps) => {
  return (
    <div style={{ fontSize: size }} className={className}>
      <div className={'spinner'} />
    </div>
  );
};

export default Spinner;
