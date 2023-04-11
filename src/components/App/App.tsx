import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ICol, IRow, IRowFilters, IUser } from '../../types';
import Row, { columns } from '../Row';
import { DRAWER_KEY, FILTER_KEY, RESULTS_PER_PAGE } from '../../api';
import UserSelector from '../UserSelector';
import { DownArrow, UpArrow } from '../Icons/Icons';
import DrawerFilters from '../DrawerFilters/DrawerFilters';
import ColumnFilter from '../ColumnFilter/ColumnFilter';
import Spinner from '../Spinner/Spinner';
import Drawer from '../Drawer/Drawer';
import Button from '../Button/Button';
import useData from '../../hooks/useData';
import { passesFilters } from '../../filters';
import { cx } from '../../utils';

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

const saveFilters = (newVal: IRowFilters) => {
  localStorage.setItem(FILTER_KEY, JSON.stringify(newVal));
};

interface IProps {
  isProd: boolean;
  loggedInUserUuid: string;
  defaultFilters: IRowFilters;
  savedFilters: IRowFilters;
}

function App({ isProd, loggedInUserUuid, defaultFilters, savedFilters }: IProps) {
  const [sortType, setSortType] = useState<string>(`${columns[columns.length - 1].label}:asc`);
  const [sortedRows, setSortedRows] = useState<IRow[]>([]);
  const [colFilers, setColFilters] = useState<{ [colLabel: string]: ColFilter }>({});
  const [currentUser, setCurrentUser] = useState<IUser>({ uuid: loggedInUserUuid, display_name: 'Me' } as IUser);
  const [drawerOpen, setDrawerOpen] = useState(localStorage.getItem(DRAWER_KEY) !== 'false');
  const [rowFilters, setRowFilters] = useState<IRowFilters>(savedFilters);

  const { isLoading, summarized, pullRequests, refresh } = useData();

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '[') {
        setDrawerOpen(false);
      } else if (e.key === ']') {
        setDrawerOpen(true);
      }
    };
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    const nextSortType = sortType;
    const sortColumn = nextSortType.split(':')[0];
    setSortedRows(getSortedRows(pullRequests, sortColumn, nextSortType.split(':')[1] === 'asc'));
  }, [pullRequests, sortType]);

  useEffect(() => {
    saveFilters(rowFilters);
  }, [rowFilters]);

  useEffect(() => {
    localStorage.setItem(DRAWER_KEY, JSON.stringify(drawerOpen));
  }, [drawerOpen]);

  const onFilterType = useCallback((col: ICol, newVal: string) => {
    setColFilters((prevState) => ({
      ...prevState,
      [col.label]: (row: IRow) => col.matchFilter?.(newVal, row) ?? true,
    }));
  }, []);

  useEffect(() => {
    // only refresh if user actually changed from the original user *or* if not in prod
    if (!isProd || currentUser.links) {
      refresh(rowFilters);
    }
  }, [currentUser, rowFilters.role, rowFilters.state, rowFilters.pageNum]);

  const onHeaderClick = (colType: string) => {
    const isAsc = sortType === `${colType}:asc`;
    setSortType(`${colType}:${isAsc ? 'desc' : 'asc'}`);
  };

  const onFilterSelect = (newVal: string, filterType: keyof IRowFilters) => {
    setRowFilters((prevState: IRowFilters) => ({
      ...prevState,
      [filterType]: newVal,
    }));
  };

  const clearFilters = () =>
    setRowFilters({
      ...defaultFilters,
    });

  const visibleRows = sortedRows.filter(
    (row) => passesFilters(row, rowFilters) && Object.values(colFilers).every((colFilter) => colFilter(row)),
  );
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

  return (
    <div className={'app__root'}>
      <div className={'app__header'}>
        <div className={'app__user-section'}>
          <UserSelector loggedInUserUuid={loggedInUserUuid} onUserChange={setCurrentUser} />
          {!isLoading && (
            <span className={'app__num-visible'}>
              {visibleRows.length} of {sortedRows.length} visible
            </span>
          )}
          {/*{!loading && (*/}
          {/*  <UserStats userUuid={currentUser.uuid} />*/}
          {/*)}*/}
        </div>
        <div className={'app__header-action-container'}>
          {sortedRows.length > 0 && (
            <>
              <span>Page</span>
              <div className={'app__page-selector'}>
                {possiblePages.map((pageNum) => (
                  <span
                    className={cx(
                      'app__page-selector__page',
                      summarized.pageNum === pageNum && 'app__page-selector__page--current',
                    )}
                    onClick={() => onPageClick(pageNum)}>
                    {pageNum}
                  </span>
                ))}
              </div>
            </>
          )}
          <Button onClick={() => refresh(rowFilters)} className={'app__refresh-btn'}>
            <span>&#8635; Refresh</span>
          </Button>
        </div>
      </div>
      <div className={'app__content'}>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerFilters
            defaultFilters={defaultFilters}
            rowFilters={rowFilters}
            summarized={summarized}
            onFilterSelect={onFilterSelect}
            clearFilters={clearFilters}
          />
        </Drawer>
        <div className={'app__content-body'}>
          <div className={'app__content-header'}>
            {columns.map((col) => (
              <div key={col.label} className={`app__content-header-col ${col.colClass}`}>
                <span className={'app__content-header-label'}>{col.label}</span>
                <div className={'app__content-header-col-actions'}>
                  {col.matchFilter && <ColumnFilter onFilterChange={(newVal: string) => onFilterType(col, newVal)} />}
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
