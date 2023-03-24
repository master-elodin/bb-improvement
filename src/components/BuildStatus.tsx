import * as React from 'react';
import { IRow } from '../types';
import { ApprovedIcon, FailedIcon } from '../img/icons';

interface IProps {
  val: IRow;
}

const BuildStatus = ({ val }: IProps) => {
  return (
    <>
      {val.buildStatus === 'success' && <ApprovedIcon />}
      {val.buildStatus === 'fail' && <FailedIcon />}
    </>
  );
};

export default BuildStatus;
