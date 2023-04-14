import * as React from 'react';
import { useEffect, useState } from 'react';
import { IInPlaceFilters, IRefreshableFilters, IRow, IRowFilters, IUser } from '../../types';
import Row, { columns } from '../Row';
import { DARK_MODE_KEY, DRAWER_KEY, FILTER_KEY, RESULTS_PER_PAGE } from '../../api';
import UserSelector from '../UserSelector';
import { DownArrow, UpArrow } from '../Icons/Icons';
import DrawerFiltersInPlace from '../DrawerFilters/DrawerFiltersInPlace';
import Spinner from '../Spinner/Spinner';
import Drawer from '../Drawer/Drawer';
import useData from '../../hooks/useData';
import { passesFilters } from '../../filters';
import { cx, sanitizeRegex } from '../../utils';
import DrawerFiltersReload from '../DrawerFilters/DrawerFiltersReload';
import AppHeader from './AppHeader/AppHeader';

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

const saveFilters = (newVal: IRowFilters) => {
  localStorage.setItem(
    FILTER_KEY,
    JSON.stringify({
      ...newVal,
      compiledRegex: undefined,
    }),
  );
};

interface IProps {
  isProd: boolean;
  loggedInUserUuid: string;
  defaultRefreshableFilters: IRefreshableFilters;
  defaultInPlaceFilters: IInPlaceFilters;
  savedFilters: IRowFilters;
}

function App({ isProd, loggedInUserUuid, defaultRefreshableFilters, defaultInPlaceFilters, savedFilters }: IProps) {
  const [sortType, setSortType] = useState<string>(`${columns[columns.length - 1].label}:asc`);
  const [sortedRows, setSortedRows] = useState<IRow[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser>({ uuid: loggedInUserUuid, display_name: 'Me' } as IUser);
  const [drawerOpen, setDrawerOpen] = useState(localStorage.getItem(DRAWER_KEY) !== 'false');
  const [rowFilters, setRowFilters] = useState<IRowFilters>(savedFilters);
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem(DARK_MODE_KEY) ?? 'false'));

  const { isLoading, summarized, pullRequests, allUsersById, refresh } = useData();

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '[') {
        setDrawerOpen(!drawerOpen);
      }
    };
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [drawerOpen]);

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const nextSortType = sortType;
    const sortColumn = nextSortType.split(':')[0];
    setSortedRows(getSortedRows(pullRequests, sortColumn, nextSortType.split(':')[1] === 'asc'));
  }, [pullRequests, sortType]);

  useEffect(() => {
    setRowFilters((prevState) => {
      const newFilters = {
        ...prevState,
        userUuid: currentUser.uuid,
      };
      // if user changes, refresh data as well
      refresh(newFilters);
      return newFilters;
    });
  }, [currentUser]);

  useEffect(() => {
    saveFilters(rowFilters);
  }, [rowFilters]);

  useEffect(() => {
    setRowFilters((prevState: IRowFilters) => {
      return {
        ...prevState,
        compiledRegex: sanitizeRegex(prevState.regex),
      };
    });
  }, [rowFilters.regex]);

  useEffect(() => {
    localStorage.setItem(DRAWER_KEY, JSON.stringify(drawerOpen));
  }, [drawerOpen]);

  useEffect(() => {
    // only refresh if user actually changed from the original user *or* if not in prod
    if (!isProd || currentUser.links) {
      refresh(rowFilters);
    }
  }, [rowFilters.pageNum]);

  const onHeaderClick = (colType: string) => {
    const isAsc = sortType === `${colType}:asc`;
    setSortType(`${colType}:${isAsc ? 'desc' : 'asc'}`);
  };

  const onFilterSelect = (newVal: string, filterType: keyof IRowFilters) => {
    setRowFilters((prevState: IRowFilters) => {
      const nextState = {
        ...prevState,
        [filterType]: newVal,
      };
      // TODO: make generic
      if (filterType === 'role' || filterType === 'state') {
        nextState.pageNum = 1;
      }
      return nextState;
    });
  };

  const onGoClick = async () => {
    await refresh(rowFilters);
  };

  const clearInPlaceFilters = () =>
    setRowFilters((prevState) => ({
      ...prevState,
      ...defaultInPlaceFilters,
      compiledRegex: undefined,
    }));

  const clearReloadFilters = () =>
    setRowFilters((prevState) => ({
      ...prevState,
      ...defaultRefreshableFilters,
    }));

  const visibleRows = sortedRows.filter((row) => passesFilters(row, rowFilters));
  const possiblePages = Array.from({ length: Math.ceil(summarized.totalNumResults / RESULTS_PER_PAGE) }).map(
    (_, pageNum) => pageNum + 1,
  );
  const onPageClick = (pageNum: number) => {
    if (pageNum === summarized.pageNum) {
      return;
    }
    summarized.pageNum = pageNum;
    setRowFilters((prevState) => ({
      ...prevState,
      pageNum,
    }));
  };

  const userSelector = (
    <UserSelector loggedInUserUuid={loggedInUserUuid} onUserChange={setCurrentUser} allUsersById={allUsersById} />
  );

  return (
    <div className={cx('app__root', isDarkMode && 'app__root--dark')}>
      <AppHeader
        onRefreshClick={() => refresh(rowFilters)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentPage={summarized.pageNum}
        possiblePages={possiblePages}
        onPageClick={onPageClick}
        userSelector={userSelector}
      />
      <div className={'app__content'}>
        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          numVisible={visibleRows.length}
          numTotal={sortedRows.length}>
          <DrawerFiltersInPlace
            defaultFilters={defaultInPlaceFilters}
            rowFilters={rowFilters}
            summarized={summarized}
            onFilterSelect={onFilterSelect}
            clearFilters={clearInPlaceFilters}
            isLoading={isLoading}
          />
          <DrawerFiltersReload
            defaultFilters={defaultRefreshableFilters}
            rowFilters={rowFilters}
            onFilterSelect={onFilterSelect}
            clearFilters={clearReloadFilters}
            onGoClick={onGoClick}
            isLoading={isLoading}
          />
        </Drawer>
        <div className={'app__content-body'}>
          <div className={'app__content-header'}>
            {columns.map((col) => (
              <div key={col.label} className={`app__content-header-col ${col.colClass}`}>
                <span className={'app__content-header-label'}>{col.label}</span>
                <div className={'app__content-header-col-actions'}>
                  <SortArrow
                    onClick={() => onHeaderClick(col.label)}
                    sort={sortType?.substring(col.label.length + 1) as any}
                  />
                </div>
              </div>
            ))}
          </div>
          {isLoading && (
            <div className={'app__content-loading-container'}>
              <Spinner size={'64px'} />
            </div>
          )}
          {!isLoading && (
            <div className={'app__content-rows'}>
              {!isLoading &&
                visibleRows.map((val: IRow, index) => <Row key={index} val={val} currentUser={currentUser} />)}
            </div>
          )}
        </div>
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
