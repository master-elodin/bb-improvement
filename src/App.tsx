import * as React from 'react';
import { useEffect, useState } from 'react';
import { userUuid } from './constants';
import { IRow } from './types';
import Row, { columns } from './Row';
import { InlineStyle } from './inlineStyles';
import { getData, getStatuses } from './api';

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
  table: {
    'border-collapse': 'collapse',
    'overflow-y': 'auto',
    'table-layout': 'fixed',
    width: '100%',
  },
  '.root': {
    padding: '20px 0',
    'font-family':
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    height: 'calc(100vh - 40px)',
  },
  '.content': {
    height: 'calc(100% - 70px)',
    padding: '0 20px 20px 20px',
    width: 'calc(100vw - 40px)',
  },
  '.spinner': {
    border: '6px solid rgba(0, 0, 0, 0.15)',
    'border-radius': '50%',
    width: '64px',
    height: '64px',
    'border-top-color': 'rgba(0, 0, 0, 0.5)',
    animation: 'rotate 1s linear infinite',
  },
  // TODO: don't copy padding
  '.name-col': {
    padding: '4px 8px',
    width: '40%',
  },
  '.tasks-col': {
    padding: '4px 8px',
    'text-align': 'right',
    width: '100px',
  },
  '.comments-col': {
    padding: '4px 8px',
    'text-align': 'right',
    width: '130px',
  },
  '.build-col': {
    padding: '4px 8px',
    width: '100px',
  },
  '.reviewers-col': {
    padding: '4px 8px',
    width: '20%',
  },
  '.activity-col': {
    padding: '4px 8px',
    width: '180px',
  },
  '.reviewerAvatar': {
    position: 'absolute',
    display: 'inline-block',
    top: '3px',
  },
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
  const [sortType, setSortType] = useState<string>(`${columns[columns.length - 1].label}:desc`);
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
      setSortedRows(prevState => {
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
  }

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
      nextSortType = `${sortColumn}:desc`;
      setSortType(nextSortType);
    }
    setSortedRows(getSortedRows(pullRequests, sortColumn, nextSortType.split(':')[1] === 'asc'));
    setLoading(false);

    await addBuildStatus(pullRequests.map((pr) => pr.source.commit.hash));
  };

  useEffect(() => {
    refresh(true);
  }, []);

  useEffect(() => {
    setSortedRows((prevState) => {
      prevState.forEach((row) => {
        row.hidden = !(currentFilters.tasks(row) && currentFilters.needsReview(row) && currentFilters.branch(row));
      });
      return [...prevState];
    });
  }, [currentFilters]);

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

  const visibleRows = sortedRows.filter((row) => !row.hidden);
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
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div className={'spinner'} />
          </div>
        )}
        {!loading && (
          <div style={{ height: '100%', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              {columns.map((col) => (
                <div key={col.label} className={col.colClass} onClick={() => onHeaderClick(col.label)}>
                  <div style={headerStyle}>
                    {col.label}
                    <SortArrow sort={sortType?.substring(col.label.length + 1) as any} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ width: '100%', height: 'calc(100% - 40px)', overflowY: 'scroll', overflowX: 'hidden' }}>
              {visibleRows.map((val, index) => (
                <Row key={index} val={val} index={index} />
              ))}
            </div>
          </div>
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
