import * as React from 'react';
import { useEffect, useState } from 'react';
import { IRow } from '../../../types';
import { formatDate } from '../../../utils';
import { getCommitsBehind, ISyncInfo } from '../../../api';

interface IProps {
  val: IRow;
  index?: number;
}

interface IBranchSyncInfo {
  value: ISyncInfo;
}

const BranchSyncInfo = ({ value: { behind, behind_truncated } }: IBranchSyncInfo) => {
  if (behind === 0) {
    return null;
  }
  let className = 'row-title__branch-sync-info';
  if (behind > 50) {
    className += ' row-title__branch-sync-info--warn';
  }
  return (
    <span className={className}>
      [<b>{behind}</b>
      {behind_truncated && '+'} commits behind]
    </span>
  );
};

const RowTitle = ({ val }: IProps) => {
  const [branchSyncInfo, setBranchSyncInfo] = useState<ISyncInfo>({ behind: 0, behind_truncated: false });

  const { id } = val;
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCommitsBehind(id);
        setBranchSyncInfo(res);
      } catch (err) {
        console.error('Failed loading branch status', err);
      }
    };
    load();
  }, [id]);

  return (
    <div className={'row-title'}>
      <img src={val.author.links.avatar.href} alt={val.author.display_name} />
      <div className={'row-title__text'}>
        <div className={'row-title__pr-name'}>
          <a href={val.links.html.href} target={'_blank'} rel='noreferrer'>
            {val.title}
          </a>
        </div>
        <div className={'row-title__extra-info'} style={{}}>
          <i>
            <b>{val.author.display_name}</b> opened at {formatDate(val.created_on)}
          </i>
          <span> &#8594; </span>
          <b>{val.destination.branch.name}</b> (
          <a href={val.destination.repository.links.html.href} target={'_blank'} rel={'noreferrer'}>
            {val.destination.repository.slug}
          </a>
          )
          <BranchSyncInfo value={branchSyncInfo} />
        </div>
      </div>
    </div>
  );
};

export default RowTitle;
