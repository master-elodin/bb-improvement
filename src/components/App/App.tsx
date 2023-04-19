import * as React from 'react';
import { useEffect, useState } from 'react';
import { IInPlaceFilters, IRow } from '../../types';
import Row, { columns } from '../Row';
import { DARK_MODE_KEY, DRAWER_KEY, IN_PLACE_FILTER_KEY, RESULTS_PER_PAGE } from '../../api';
import { DownArrow, UpArrow } from '../Icons/Icons';
import DrawerFiltersInPlace from '../DrawerFilters/DrawerFiltersInPlace';
import Spinner from '../Spinner/Spinner';
import Drawer from '../Drawer/Drawer';
import useData from '../../hooks/useData';
import { passesFilters } from '../../filters';
import { cx, sanitizeRegex } from '../../utils';
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

const saveFilters = (newVal: IInPlaceFilters) => {
  localStorage.setItem(
    IN_PLACE_FILTER_KEY,
    JSON.stringify({
      ...newVal,
      compiledRegex: undefined,
    }),
  );
};

const defaultInPlaceFilter: Partial<IInPlaceFilters> = {
  regex: '',
  compiledRegex: undefined,
  tasks: 'any',
  needsReview: 'any',
  branch: 'any',
  repo: 'any',
  build: 'any',
};

interface IProps {
  loggedInUserUuid: string;
  savedInPlaceFilters: IInPlaceFilters;
}

function App({ loggedInUserUuid, savedInPlaceFilters }: IProps) {
  const [sortType, setSortType] = useState<string>(`${columns[columns.length - 1].label}:asc`);
  const [sortedRows, setSortedRows] = useState<IRow[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(localStorage.getItem(DRAWER_KEY) !== 'false');
  const [inPlaceFilters, setInPlaceFilters] = useState<IInPlaceFilters>(savedInPlaceFilters);
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
    saveFilters(inPlaceFilters);
  }, [inPlaceFilters]);

  useEffect(() => {
    setInPlaceFilters((prevState: IInPlaceFilters) => {
      return {
        ...prevState,
        compiledRegex: sanitizeRegex(prevState.regex),
      };
    });
  }, [inPlaceFilters.regex]);

  useEffect(() => {
    localStorage.setItem(DRAWER_KEY, JSON.stringify(drawerOpen));
  }, [drawerOpen]);

  const onHeaderClick = (colType: string) => {
    const isAsc = sortType === `${colType}:asc`;
    setSortType(`${colType}:${isAsc ? 'desc' : 'asc'}`);
  };

  const onFilterSelect = (newVal: string, filterType: keyof IInPlaceFilters) => {
    if (inPlaceFilters[filterType] === newVal) {
      // nothing to do
      return;
    }
    setInPlaceFilters((prevState) => ({
      ...prevState,
      [filterType]: newVal,
    }));
  };

  const clearInPlaceFilters = () =>
    setInPlaceFilters({
      ...defaultInPlaceFilter,
      userUuid: loggedInUserUuid,
    } as IInPlaceFilters);

  const visibleRows = sortedRows.filter((row) => passesFilters(row, inPlaceFilters));
  const possiblePages = Array.from({ length: Math.ceil(summarized.totalNumResults / RESULTS_PER_PAGE) }).map(
    (_, pageNum) => pageNum + 1,
  );

  const onUserChange = (newUuid: string) => onFilterSelect(newUuid, 'userUuid');

  return (
    <div className={cx('app__root', isDarkMode && 'app__root--dark')}>
      <AppHeader
        refresh={refresh}
        onUserChange={onUserChange}
        loggedInUserUuid={loggedInUserUuid}
        allUsersById={allUsersById}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        possiblePages={possiblePages}
      />
      <div className={'app__content'}>
        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          numVisible={visibleRows.length}
          numTotal={sortedRows.length}>
          <DrawerFiltersInPlace
            inPlaceFilters={inPlaceFilters}
            summarized={summarized}
            onFilterSelect={onFilterSelect}
            clearFilters={clearInPlaceFilters}
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
                visibleRows.map((val: IRow, index) => (
                  <Row key={index} val={val} currentUser={allUsersById[inPlaceFilters.userUuid]} />
                ))}
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
