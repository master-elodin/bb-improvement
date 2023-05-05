import * as React from 'react';
import { IRow } from '../../types';
import { ApprovedIcon, FailedIcon } from '../../img/icons';
import Spinner from '../Spinner/Spinner';

interface IProps {
  val: IRow;
}

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
        {val.buildStatus.state === 'INPROGRESS' && <Spinner size={'5px'} className={'build-status__in-progress'} />}
      </span>
    </a>
  );
};

export default BuildStatus;
