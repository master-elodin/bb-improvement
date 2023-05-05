import * as React from 'react';

interface IProps {
  value: number;
}

const RowNumber = ({ value }: IProps) => <div className={'row__number'}>{value || ''}</div>;

export default RowNumber;
