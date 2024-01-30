import * as React from 'react';
import { formatDate, msToTime } from '../../../utils';
import { IRow } from '../../../types';

interface IProps {
  val: IRow;
}

const LastActivity = ({ val }: IProps) => {
  return (
    <div className={'last-activity'}>
      {val.closed_on && (
        <div className={'last-activity__big last-activity__big--solo'} title={formatDate(val.updated_on)}>
          Closed for {msToTime(Date.now() - new Date(val.closed_on).getTime())}
        </div>
      )}
      {!val.closed_on && (
        <>
          <div className={'last-activity__big'} title={formatDate(val.updated_on)}>
            {msToTime(Date.now() - new Date(val.updated_on).getTime())} ago
          </div>
          <div className={'last-activity__description'}>
            Open for {msToTime(Date.now() - new Date(val.created_on).getTime())}
          </div>
        </>
      )}
    </div>
  );
};

export default LastActivity;
