import * as React from 'react';
import UserSelector from '../../UserSelector';
import Button from '../../Button/Button';
import { cx } from '../../../utils';
import DarkModeToggle from '../DarkModeToggle';
import PageArrow from './PageArrow';

interface IProps {
  onRefreshClick: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (newVal: boolean) => void;
  pageNum: number;
  possiblePages: number[];
  onPageClick: (newVal: number) => void;
  userSelector: React.ReactNode;
}

const AppHeader = ({
  onRefreshClick,
  isDarkMode,
  setIsDarkMode,
  pageNum,
  possiblePages,
  onPageClick,
  userSelector,
}: IProps) => {
  // TODO: don't show pages if there's nothing loaded yet?
  return (
    <div className={'app-header__root'}>
      {userSelector}
      {/*{!loading && (*/}
      {/*  <UserStats userUuid={currentUser.uuid} />*/}
      {/*)}*/}
      <Button onClick={onRefreshClick} className={'app-header__refresh-btn'}>
        <span>&#8635; Refresh</span>
      </Button>
      <div className={'app-header__page-selector'}>
        <PageArrow pageNum={pageNum} onPageClick={onPageClick} limit={1} direction={'<'} />
        {possiblePages.map((p) => (
          <span
            key={p}
            className={cx(
              'app-header__page-selector__page',
              pageNum !== p && 'link app-header__page-selector__page--clickable',
              pageNum === p && 'app-header__page-selector__page--current',
            )}
            onClick={() => onPageClick(p)}>
            {p}
          </span>
        ))}
        <PageArrow
          pageNum={pageNum}
          onPageClick={onPageClick}
          limit={Math.max(1, possiblePages.length)}
          direction={'>'}
        />
      </div>
      <div className={'app__header-config'}>
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
};

export default AppHeader;
