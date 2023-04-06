import { ApprovedIcon, RequestChangesIcon } from '../img/icons';
import { IRow, IUser } from '../types';
import * as React from 'react';

interface IProps {
  val: IRow;
  currentUser: IUser;
}

const Reviewers = ({ val, currentUser }: IProps) => {
  const reviewers = val.participants
    .filter((p) => p.role === 'REVIEWER')
    .sort((a, b) => {
      if (a.state !== b.state) {
        if (a.state === 'changes_requested') {
          return -1;
        }
        if (b.state === 'changes_requested') {
          return 1;
        }
      }
      if (a.approved !== b.approved) {
        return a.approved ? -1 : 1;
      }
      if (a.user.uuid === currentUser.uuid) {
        return -1;
      }
      if (b.user.uuid === currentUser.uuid) {
        return 1;
      }
      return a.user.display_name.localeCompare(b.user.display_name);
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
          {reviewer.state !== null && (
            <span style={{ position: 'absolute', left: '-5px', bottom: '-5px' }}>
              {reviewer.state === 'approved' && <ApprovedIcon />}
              {reviewer.state === 'changes_requested' && <RequestChangesIcon />}
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default Reviewers;
