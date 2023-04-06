import * as React from 'react';

interface IProps {
  size?: string;
}

const Spinner = ({ size }: IProps) => {
  return (
    <div style={{ fontSize: size }}>
      <div className={'spinner'} />
    </div>
  );
};

export default Spinner;
