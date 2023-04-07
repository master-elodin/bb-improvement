import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ICol, IFilter, IRow, IUser, PRState } from '../../types';
import Row, { columns } from '../Row';
import { DRAWER_KEY, FILTER_KEY, getPullRequests, getStatuses } from '../../api';
import UserSelector from '../UserSelector';
import { DownArrow, UpArrow } from '../Icons/Icons';
import DrawerFilters from '../HeaderOptions/DrawerFilters';
import { filters, FilterType } from '../../filters';
import ColumnFilter from '../ColumnFilter/ColumnFilter';
import Spinner from '../Spinner/Spinner';
import Drawer from '../Drawer/Drawer';
import Button from '../Button/Button';

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

type ColFilter = (row: IRow) => boolean;

const savedFilters = JSON.parse(localStorage.getItem(FILTER_KEY) ?? '{}');

const saveFilters = (newVal: string, filterType: FilterType) => {
  savedFilters[filterType] = newVal;
  localStorage.setItem(FILTER_KEY, JSON.stringify(savedFilters));
};

const loadFilters = () => {
  return {
    tasks: filters.tasks[savedFilters.tasks ?? 'any'],
    needsReview: filters.needsReview[savedFilters.needsReview ?? 'any'],
    branch: filters.branch.any,
    repo: filters.repo.any,
  };
};

interface IProps {
  isProd: boolean;
  loggedInUserUuid: string;
}

function App({ isProd, loggedInUserUuid }: IProps) {
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<string>(`${columns[columns.length - 1].label}:asc`);
  const [sortedRows, setSortedRows] = useState<IRow[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Record<string, IFilter>>(loadFilters());
  const [colFilers, setColFilters] = useState<{ [colLabel: string]: ColFilter }>({});
  const [allBranches, setAllBranches] = useState<string[]>([]);
  const [allRepoNames, setAllRepoNames] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser>({ uuid: loggedInUserUuid, display_name: 'Me' } as IUser);
  const [isReviewing, setIsReviewing] = useState(savedFilters.isReviewing !== 'false');
  const [prState, setPRState] = useState<PRState>(savedFilters.prState ?? 'OPEN');
  const [drawerOpen, setDrawerOpen] = useState(localStorage.getItem(DRAWER_KEY) !== 'false');

  useEffect(() => {
    saveFilters(prState, 'prState');
  }, [prState]);

  useEffect(() => {
    saveFilters(JSON.stringify(isReviewing), 'isReviewing');
  }, [isReviewing]);

  useEffect(() => {
    localStorage.setItem(DRAWER_KEY, JSON.stringify(drawerOpen));
  }, [drawerOpen]);

  const onFilterType = useCallback((col: ICol, newVal: string) => {
    setColFilters((prevState) => ({
      ...prevState,
      [col.label]: (row: IRow) => col.matchFilter?.(newVal, row) ?? true,
    }));
  }, []);

  const addBuildStatus = async (commits: string[]) => {
    try {
      // TODO: make statuses work for every repo
      const statuses = await getStatuses(commits);
      setSortedRows((prevState) => {
        prevState.forEach((pr) => {
          pr.buildStatus = statuses[pr.source.commit.hash];
        });
        return [...prevState];
      });
    } catch (e) {
      console.error('Could not add status', e);
    }
  };

  const refresh = async (userUuid: string, resetSort = false) => {
    setLoading(true);
    const pullRequests = await getPullRequests(userUuid, isReviewing, prState);
    const branches = [...new Set(pullRequests.map((row) => row.destination.branch.name))].sort();
    filters.branch = {
      any: () => true,
    };
    branches.forEach((branch) => {
      filters.branch[branch] = (row: IRow) => row.destination.branch.name === branch;
    });
    setAllBranches(branches);

    filters.repo = {
      any: () => true,
    };
    const repoNames = [...new Set(pullRequests.map((p) => p.destination.repository.slug))].sort();
    repoNames.forEach((repo) => (filters.repo[repo] = (row: IRow) => row.destination.repository.slug === repo));
    setAllRepoNames(repoNames);

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
    // only refresh if user actually changed from the original user *or* if not in prod
    if (!isProd || currentUser.links) {
      refresh(currentUser.uuid, true);
    }
  }, [currentUser, isReviewing, prState]);

  const onHeaderClick = (colType: string) => {
    const isAsc = sortType === `${colType}:asc`;
    setSortedRows((prevState) => getSortedRows(prevState, colType, isAsc));
    // hack to change sort type each time
    setSortType(`${colType}:${isAsc ? 'desc' : 'asc'}`);
  };

  const onFilterSelect = (newVal: string, filterType: FilterType) => {
    setCurrentFilters((prevState) => {
      prevState[filterType] = filters[filterType][newVal];
      return { ...prevState };
    });
    saveFilters(newVal, filterType);
  };

  const visibleRows = sortedRows.filter(
    (row) =>
      currentFilters.tasks(row, currentUser) &&
      currentFilters.needsReview(row, currentUser) &&
      currentFilters.branch(row, currentUser) &&
      currentFilters.repo(row, currentUser) &&
      Object.values(colFilers).every((colFilter) => colFilter(row)),
  );
  return (
    <div className={'app__root'}>
      <div className={'app__header'}>
        <div className={'app__user-section'}>
          <UserSelector loggedInUserUuid={loggedInUserUuid} onUserChange={setCurrentUser} />
          {!loading && (
            <span className={'app__num-visible'}>
              {visibleRows.length} of {sortedRows.length} visible
            </span>
          )}
          {/*{!loading && (*/}
          {/*  <UserStats userUuid={currentUser.uuid} />*/}
          {/*)}*/}
        </div>
        <div className={'app__header-action-container'}>
          <Button onClick={() => refresh(currentUser.uuid)} className={'app__refresh-btn'}>
            <span>&#8635; Refresh</span>
          </Button>
        </div>
      </div>
      <div className={'app__content'}>
        {loading && (
          <div className={'app__content-loading-container'}>
            <Spinner size={'64px'} />
          </div>
        )}
        {!loading && (
          <>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerFilters
                allBranches={allBranches}
                allRepoNames={allRepoNames}
                onFilterSelect={onFilterSelect}
                onPRTypeChange={(newVal) => setIsReviewing(newVal === 'reviewer')}
                onPRStateChange={(newVal) => setPRState(newVal)}
              />
            </Drawer>
            <div className={'app__content-body'}>
              <div className={'app__content-header'}>
                {columns.map((col) => (
                  <div key={col.label} className={`app__content-header-col ${col.colClass}`}>
                    <span className={'app__content-header-label'}>{col.label}</span>
                    <div className={'app__content-header-col-actions'}>
                      {col.matchFilter && (
                        <ColumnFilter onFilterChange={(newVal: string) => onFilterType(col, newVal)} />
                      )}
                      <SortArrow
                        onClick={() => onHeaderClick(col.label)}
                        sort={sortType?.substring(col.label.length + 1) as any}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={'app__content-rows'}>
                {visibleRows.map((val, index) => (
                  <Row key={index} val={val} currentUser={currentUser} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface ISortArrowProps {
  onClick: () => void;
  sort?: 'asc' | 'desc';
}

const SortArrow = ({ onClick, sort }: ISortArrowProps) => {
  return (
    <div className={'app__sort-arrows'} onClick={onClick}>
      {<UpArrow selected={sort === 'asc'} />}
      {<DownArrow selected={sort === 'desc'} />}
    </div>
  );
};

export default App;
