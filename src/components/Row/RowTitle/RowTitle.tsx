import * as React from 'react';
import { IRow } from '../../../types';
import { formatDate } from '../../../utils';
import BranchSyncInfo from './BranchSyncInfo';

interface IProps {
  row: IRow;
  index?: number;
}

const RowTitle = ({ row }: IProps) => {
  return (
    <div className={'row-title'}>
      <img src={row.author.links.avatar.href} alt={row.author.display_name} />
      <div className={'row-title__text'}>
        <div className={'row-title__pr-name'}>
          <a href={row.links.html.href} target={'_blank'} rel='noreferrer'>
            {row.title}
          </a>
        </div>
        <div className={'row-title__extra-info'} style={{}}>
          <i>
            <b>{row.author.display_name}</b> opened at {formatDate(row.created_on)}
          </i>
          <span> &#8594; </span>
          <b>{row.destination.branch.name}</b> (
          <a href={row.destination.repository.links.html.href} target={'_blank'} rel={'noreferrer'}>
            {row.destination.repository.slug}
          </a>
          )
          <BranchSyncInfo row={row} />
        </div>
      </div>
    </div>
  );
};

export default RowTitle;
