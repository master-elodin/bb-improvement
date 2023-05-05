import * as React from 'react';
import { IRow } from '../../../types';
import { formatDate } from '../../../utils';

interface IProps {
  val: IRow;
  index?: number;
}

const RowTitle = ({ val }: IProps) => {
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
        </div>
      </div>
    </div>
  );
};

export default RowTitle;
