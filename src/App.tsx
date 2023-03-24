import * as React from 'react';
import { useEffect, useState } from 'react';
import { userUuid } from './constants';
import { IRow } from './types';
import Row, { columns } from './Row';
import { InlineStyle } from './inlineStyles';
import { getData, getStatuses } from './api';

const fullWidth = 'calc(100vw - 50px)'

InlineStyle({
  body: {
    'background-color': 'rgba(236, 240, 241, .2)',
  },
  select: {
    height: '24px',
  },
  button: {
    height: '24px',
    cursor: 'pointer',
  },
  '.root': {
    padding: '20px 0',
    'font-family':
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    height: 'calc(100vh - 40px)',
    overflow: 'hidden',
  },
  '.content': {
    height: 'calc(100% - 60px)',
    padding: '0 20px 20px 20px',
    width: fullWidth,
  },
  '.spinner': {
    border: '6px solid rgba(0, 0, 0, 0.15)',
    'border-radius': '50%',
    width: '64px',
    height: '64px',
    'border-top-color': 'rgba(0, 0, 0, 0.5)',
    animation: 'rotate 1s linear infinite',
  },
  '.content-header': {
    display: 'flex',
    height: '35px',
    'justify-content': 'space-around',
    'padding-bottom': '5px',
    width: fullWidth,
  },
  '.row': {
    padding: '4px 8px',
    display: 'flex',
    height: '40px',
    'justify-content': 'space-around',
    width: fullWidth,
  },
  '.row:nth-child(odd)': {
    'background-color': 'rgba(236, 240, 241, .6)',
  },
  '.row-col': {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  '.name-col': {
    'flex-grow': 1,
    'min-width': '750px',
  },
  '.tasks-col': {
    width: '100px',
  },
  '.row-col.tasks-col': {
    'line-height': '40px;',
  },
  '.row-col.tasks-col span': {
    'padding-left': '12px;',
  },
  '.comments-col': {
    width: '130px',
  },
  '.row-col.comments-col': {
    'line-height': '40px;',
  },
  '.row-col.comments-col span': {
    'padding-left': '12px;',
  },
  '.build-col': {
    width: '100px',
  },
  '.row .build-col': {
    'position': 'relative',
  },
  '.row .build-col svg': {
    left: 'calc(50% - 20px)',
    position: 'absolute',
    top: '10px',
  },
  '.reviewers-col': {
    width: '20%',
  },
  '.row-col.reviewers-col': {
    position: 'relative',
  },
  '.activity-col': {
    'min-width': '190px',
    width: '190px',
  },
  '.row-col.activity-col': {
    display: 'flex',
    'flex-direction': 'column',
    'padding-top': '4px',
  },
  '.last-activity': {
    'padding-left': '8px',
  },
  '.reviewerAvatar': {
    position: 'absolute',
    display: 'inline-block',
    top: '7px',
  },
  '.reviewerAvatar img': {
    'clip-path': 'circle()',
    height: '24px',
    width: '24px',
    border: '1px solid black',
    'border-radius': '12px',
  }
});

const headerStyle: React.CSSProperties = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 8px',
  textAlign: 'left',
};

const pageHeaderStyle: React.CSSProperties = {
  borderBottom: '1px solid black',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  padding: '0 20px 20px 20px',
};

const getSortedRows = (rows: IRow[], colType: string, isAsc?: boolean) => {
  const getValue = columns.find((col) => col.label === colType)?.getValue ?? (() => 'zzzz');
  rows.sort((a, b) => {
    const val1 = getValue(isAsc ? a : b);
    const val2 = getValue(isAsc ? b : a);
    if (typeof val2 === 'number') {
      // @ts-ignore: revisit?
      return val2 - val1;
    }
    return val2.localeCompare(val1 as string);
  });
  return [...rows];
};

type IFilter = (row: IRow) => boolean;
const rowHasApproval = (row: IRow) => row.participants.some((user) => user.user.uuid === userUuid && user.approved);
const filters: Record<string, Record<string, IFilter>> = {
  tasks: {
    any: () => true,
    yes: (row: IRow) => row.task_count > 0,
    no: (row: IRow) => row.task_count === 0,
  },
  needsReview: {
    any: () => true,
    yes: (row: IRow) => !rowHasApproval(row),
    no: (row: IRow) => rowHasApproval(row),
  },
  branch: {
    any: () => true,
  },
};

// TODO: table should be fixed so only tbody scrolls
// TODO: don't reset sort on refresh

function App() {
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<string>(`${columns[columns.length - 1].label}:asc`);
  const [sortedRows, setSortedRows] = useState<IRow[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Record<string, IFilter>>({
    tasks: filters.tasks.any,
    needsReview: filters.needsReview.any,
    branch: filters.branch.any,
  });
  const [allBranches, setAllBranches] = useState<string[]>([]);

  const addBuildStatus = async (commits: string[]) => {
    try {
      const statuses = await getStatuses(commits);
      setSortedRows((prevState) => {
        prevState.forEach((pr) => {
          const status = statuses[pr.source.commit.hash];
          if (status?.state === 'SUCCESSFUL') {
            pr.buildStatus = 'success';
          } else if (status?.state === 'INPROGRESS') {
            pr.buildStatus = 'in_progress';
          } else if (status?.state === 'FAILED') {
            pr.buildStatus = 'fail';
          }
        });
        return [...prevState];
      });
    } catch (e) {
      console.error('Could not add status', e);
    }
  };

  const refresh = async (resetSort = false) => {
    setLoading(true);
    const pullRequests = await getData();
    const branches = [...new Set(pullRequests.map((row) => row.destination.branch.name))].sort();
    filters.branch = {
      any: () => true,
    };
    branches.forEach((branch) => {
      filters.branch[branch] = (row: IRow) => row.destination.branch.name === branch;
    });
    setAllBranches(branches);

    let nextSortType = sortType;
    let sortColumn = nextSortType.split(':')[0];
    if (resetSort) {
      sortColumn = columns[columns.length - 1].label;
      nextSortType = `${sortColumn}:asc`;
      setSortType(nextSortType);
    }
    setSortedRows(getSortedRows(pullRequests, sortColumn, nextSortType.split(':')[1] === 'asc'));
    setLoading(false);

    await addBuildStatus(pullRequests.map((pr) => pr.source.commit.hash));
  };

  useEffect(() => {
    refresh(true);
  }, []);

  const onHeaderClick = (colType: string) => {
    const isAsc = sortType === `${colType}:asc`;
    setSortedRows((prevState) => getSortedRows(prevState, colType, isAsc));
    // hack to change sort type each time
    setSortType(`${colType}:${isAsc ? 'desc' : 'asc'}`);
  };

  const onFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>, filterType: 'needsReview' | 'tasks' | 'branch') => {
    const newVal = e.target.value;
    setCurrentFilters((prevState) => {
      prevState[filterType] = filters[filterType][newVal];
      return { ...prevState };
    });
  };
  const onReviewFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => onFilterSelect(e, 'needsReview');
  const onTaskFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => onFilterSelect(e, 'tasks');
  const onBranchFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => onFilterSelect(e, 'branch');

  const visibleRows = sortedRows.filter((row) => currentFilters.tasks(row) && currentFilters.needsReview(row) && currentFilters.branch(row));
  return (
    <div className={'root'}>
      <div style={pageHeaderStyle}>
        <div style={{ display: 'flex' }}>
          <h3 style={{ margin: '5px 10px 0 10px' }}>
            My PRs
            <span style={{ fontSize: '.8em', fontWeight: 'normal', paddingLeft: '20px' }}>
              {visibleRows.length} of {sortedRows.length} visible
            </span>
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '20px', height: '24px' }}>
          <div>
            <span>Target: </span>
            <select defaultValue={'any'} onChange={onBranchFilterSelect}>
              <option value={'any'}>Any</option>
              {allBranches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>Open tasks: </span>
            <select defaultValue={'any'} onChange={onTaskFilterSelect}>
              <option value={'any'}>Any tasks</option>
              <option value={'yes'}>Has open tasks</option>
              <option value={'no'}>No open tasks</option>
            </select>
          </div>
          <div>
            <span>Needs my review: </span>
            <select defaultValue={'any'} onChange={onReviewFilterSelect}>
              <option value={'any'}>---</option>
              <option value={'yes'}>Needs review</option>
              <option value={'no'}>Review complete</option>
            </select>
          </div>
          <button onClick={() => refresh()}>
            Reload <span>&#8635;</span>
          </button>
        </div>
      </div>
      <div className={'content'}>
        {loading && (
          <div style={{ width: fullWidth, display: 'flex', justifyContent: 'center' }}>
            <div className={'spinner'} />
          </div>
        )}
        {!loading && (
          <>
            <div className={'content-header'}>
              {columns.map((col) => (
                <div key={col.label} className={col.colClass} onClick={() => onHeaderClick(col.label)}>
                  <div style={headerStyle}>
                    {col.label}
                    <SortArrow sort={sortType?.substring(col.label.length + 1) as any} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ width: fullWidth, height: 'calc(100% - 40px)', overflowY: 'scroll', overflowX: 'hidden' }}>
              {visibleRows.map((val, index) => (
                <Row key={index} val={val} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface ISortArrowProps {
  sort?: 'asc' | 'desc';
}

const UpArrow = (selected: boolean) => <span style={{ opacity: selected ? 1 : 0.2 }}>&#x25B2;</span>;
const DownArrow = (selected: boolean) => <span style={{ opacity: selected ? 1 : 0.2 }}>&#x25BC;</span>;

const SortArrow = ({ sort }: ISortArrowProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {UpArrow(sort === 'asc')}
      {DownArrow(sort === 'desc')}
    </div>
  );
};

export default App;
