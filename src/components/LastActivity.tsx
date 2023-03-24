import * as React from 'react';
import { formatDate, msToTime } from '../utils';
import { IRow } from '../types';

interface IProps {
  val: IRow;
}

const LastActivity = ({ val }: IProps) => {
  return (
    <>
      <div style={{ fontSize: '.9em' }}>{formatDate(val.updated_on)}</div>
      <div style={{ fontSize: '.7em' }}>Open for {msToTime(Date.now() - new Date(val.created_on).getTime())}</div>
    </>
  );
};

export default LastActivity;
