import * as React from 'react';
import { ICol, IRow } from './types';
import RowTitle from './RowTitle';
import LastActivity from './components/LastActivity';
import Reviewers from './components/Reviewers';
import BuildStatus from './components/BuildStatus';

export const columns: ICol[] = [
  {
    label: 'Name',
    getValue: (val: IRow) => val.title,
    getRendered: (val: IRow) => <RowTitle val={val} />,
    colClass: 'name-col',
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
    getValue: (val: IRow) => (val.buildStatus === 'success' ? 1 : 0),
    getRendered: (val: IRow) => <BuildStatus val={val} />,
    colClass: 'build-col',
  },
  {
    label: 'Reviewers',
    getValue: (val: IRow) => val.participants.filter((p) => p.role === 'REVIEWER' && p.approved).length,
    getRendered: (val: IRow) => <Reviewers val={val} />,
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
  index?: number;
}

const Row = ({ val, index }: IProps) => {
  return (
    <div className={'row'}>
      {columns.map((col) => (
        <div key={col.label} className={`row-col ${col.colClass}`}>
          {(col.getRendered ?? col.getValue)(val)}
        </div>
      ))}
    </div>
  );
};

export default Row;
