import * as React from 'react';
import { formatDate, msToTime } from '../utils';
import { IRow } from '../types';

interface IProps {
  val: IRow;
}

const LastActivity = ({ val }: IProps) => {
  return (
    <div className={'last-activity'}>
      <div style={{ fontSize: '.9em' }} title={formatDate(val.updated_on)}>
        {msToTime(Date.now() - new Date(val.updated_on).getTime())} ago
      </div>
      <div style={{ fontSize: '.7em' }}>Open for {msToTime(Date.now() - new Date(val.created_on).getTime())}</div>
    </div>
  );
};

export default LastActivity;
