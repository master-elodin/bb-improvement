import * as React from 'react';
import { ICol, IRow, IUser } from '../types';
import RowTitle from './RowTitle/RowTitle';
import LastActivity from './LastActivity';
import Reviewers from './Reviewers/Reviewers';
import BuildStatus from './BuildStatus';

export const columns: ICol[] = [
  {
    label: 'Name',
    getValue: (val: IRow) => val.title,
    getRendered: (val: IRow) => <RowTitle val={val} />,
    colClass: 'name-col',
    matchFilter: (newVal: string, row: IRow) => {
      const filtersByType = newVal
        .split(',')
        .map((v) => v.trim().toLowerCase())
        .filter((v) => !!v)
        .reduce(
          (acc, val) => {
            const isNot = val.startsWith('!');
            const matchVal = isNot ? val.substring(1) : val;
            const matchTitle = row.title.toLowerCase().includes(matchVal);
            const matchAuthor = row.author.display_name.toLowerCase().includes(matchVal);
            const matchBranch = row.destination.branch.name.toLowerCase().includes(matchVal);
            if (isNot) {
              acc.notHas.push(!matchTitle && !matchAuthor && !matchBranch);
            } else {
              acc.has.push(matchTitle || matchAuthor || matchBranch);
            }
            return acc;
          },
          { has: [] as boolean[], notHas: [] as boolean[] },
        );
      return filtersByType.has.some(Boolean) && filtersByType.notHas.every(Boolean);
    },
  },
  {
    label: 'Tasks',
    getValue: (val: IRow) => val.task_count,
    getRendered: (val: IRow) => <span>{val.task_count || ''}</span>,
    colClass: 'tasks-col',
  },
  {
    label: 'Comments',
    getValue: (val: IRow) => val.comment_count,
    getRendered: (val: IRow) => <span>{val.comment_count || ''}</span>,
    colClass: 'comments-col',
  },
  {
    label: 'Build',
    getValue: (val: IRow) => (val.buildStatus?.state === 'SUCCESSFUL' ? 1 : 0),
    getRendered: (val: IRow) => <BuildStatus val={val} />,
    colClass: 'build-col',
  },
  {
    label: 'Reviewers',
    getValue: (val: IRow) => val.participants.filter((p) => p.role === 'REVIEWER' && p.approved).length,
    getRendered: (val: IRow, currentUser: IUser) => <Reviewers val={val} currentUser={currentUser} />,
    colClass: 'reviewers-col',
  },
  {
    label: 'Last activity',
    getValue: (val: IRow) => val.updated_on,
    getRendered: (val: IRow) => <LastActivity val={val} />,
    colClass: 'activity-col',
  },
];

// TODO: configurable columns

interface IProps {
  val: IRow;
  currentUser: IUser;
}

const Row = ({ val, currentUser }: IProps) => {
  return (
    <div className={'row'}>
      {columns.map((col) => (
        <div key={col.label} className={`row-col ${col.colClass}`}>
          {(col.getRendered ?? col.getValue)(val, currentUser)}
        </div>
      ))}
    </div>
  );
};

export default Row;
