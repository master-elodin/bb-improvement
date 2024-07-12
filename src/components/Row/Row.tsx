import * as React from 'react';
import { ICol, IRow, IUser } from '../../types';
import RowTitle from './RowTitle/RowTitle';
import LastActivity from './LastActivity/LastActivity';
import Reviewers from './Reviewers/Reviewers';
import BuildStatus from './BuildStatus/BuildStatus';
import JiraIssue from './JiraIssue/JiraIssue';
import RowNumber from './RowNumber';

export const columns: ICol[] = [
  {
    id: 'name',
    label: 'Name',
    getValue: (val: IRow) => val.title,
    getRendered: (val: IRow) => <RowTitle row={val} />,
  },
  {
    id: 'jira',
    label: 'Jira',
    getValue: () => -1,
    getRendered: (val: IRow) => <JiraIssue prId={val.id} />,
    hideSort: true,
  },
  {
    id: 'tasks',
    label: 'Tasks',
    getValue: (val: IRow) => val.task_count,
    getRendered: (val: IRow) => <RowNumber value={val.task_count} />,
  },
  {
    id: 'comments',
    label: 'Comments',
    getValue: (val: IRow) => val.comment_count,
    getRendered: (val: IRow) => <RowNumber value={val.comment_count} />,
  },
  {
    id: 'build',
    label: 'Build',
    getValue: (val: IRow) => (val.buildStatus?.state === 'SUCCESSFUL' ? 1 : 0),
    getRendered: (val: IRow) => <BuildStatus val={val} />,
  },
  {
    id: 'reviewers',
    label: 'Reviewers',
    getValue: (val: IRow) => val.participants.filter((p) => p.approved).length,
    getRendered: (val: IRow, currentUser: IUser) => <Reviewers val={val} currentUser={currentUser} />,
  },
  {
    id: 'activity',
    label: 'Last activity',
    getValue: (val: IRow) => val.updated_on,
    getRendered: (val: IRow) => <LastActivity val={val} />,
  },
];

interface IProps {
  val: IRow;
  currentUser: IUser;
}

const Row = ({ val, currentUser }: IProps) => {
  return (
    <div className={'row'}>
      {columns.map((col) => (
        <div key={col.label} className={`row-col`} style={{width: `var(--width-${col.id})`}}>
          {col.getRendered (val, currentUser)}
        </div>
      ))}
    </div>
  );
};

export default Row;
