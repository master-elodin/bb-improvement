import { ApprovedIcon } from '../img/icons';
import { IRow } from '../types';
import * as React from 'react';

interface IProps {
  val: IRow;
}

const Reviewers = ({ val }: IProps) => {
  const reviewers = val.participants
    .filter((p) => p.role === 'REVIEWER')
    .sort((a, b) => {
      if (a.approved === b.approved) {
        return a.user.display_name.localeCompare(b.user.display_name);
      }
      return a.approved ? -1 : 1;
    });
  return (
    <>
      {reviewers.map((reviewer, index) => (
        <div
          className={'reviewerAvatar'}
          key={reviewer.user.uuid}
          style={{ left: `${(index ?? 0) * 15 + 5}px` }}
          title={reviewer.user.display_name}>
          <img src={reviewer.user.links.avatar.href} alt={reviewer.user.display_name} />
          {reviewer.approved && (
            <span style={{ position: 'absolute', left: '-5px', bottom: '-5px' }}>
              <ApprovedIcon />
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default Reviewers;
