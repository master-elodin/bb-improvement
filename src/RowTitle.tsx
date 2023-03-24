import * as React from 'react';
import { IRow } from './types';
import { formatDate } from './utils';

interface IProps {
  val: IRow;
  index?: number;
}

const RowTitle = ({ val }: IProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
        <a href={val.links.html.href} target={'_blank'} rel='noreferrer'>
          {val.title}
        </a>
      </div>
      <div style={{ fontSize: '0.8em', fontStyle: 'italic' }}>
        <b>{val.author.display_name}</b> opened at {formatDate(val.created_on)} &#8594; <b>{val.destination.branch.name}</b>
      </div>
    </div>
  );
};

export default RowTitle;
