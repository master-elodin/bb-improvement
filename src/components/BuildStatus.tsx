import * as React from 'react';
import { IRow } from '../types';
import { ApprovedIcon, FailedIcon } from '../img/icons';

interface IProps {
  val: IRow;
}

// TODO: in-progress
const BuildStatus = ({ val }: IProps) => {
  if (!val.buildStatus) {
    return null;
  }
  // TODO: better time
  return (
    <a href={val.buildStatus.commit_status.url} target={'_blank'} rel={'noreferrer'}>
      <span
        title={`${val.buildStatus.commit_status.description} (${val.buildStatus.commit_status.updated_on})`}>
        {val.buildStatus.state === 'SUCCESSFUL' && <ApprovedIcon />}
        {val.buildStatus.state === 'FAILED' && <FailedIcon />}
      </span>
    </a>
  );
};

export default BuildStatus;
