import * as React from 'react';
import Button from '../../Button/Button';
import DarkModeToggle from '../DarkModeToggle';
import PageArrow from './PageArrow';
import PageNumber from './PageNumber';

interface IProps {
  onRefreshClick: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (newVal: boolean) => void;
  currentPage: number;
  possiblePages: number[];
  onPageClick: (newVal: number) => void;
  userSelector: React.ReactNode;
}

const AppHeader = ({
  onRefreshClick,
  isDarkMode,
  setIsDarkMode,
  currentPage,
  possiblePages,
  onPageClick,
  userSelector,
}: IProps) => {
  // TODO: don't show pages if there's nothing loaded yet?
  const numPages = possiblePages.length;
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
        <PageArrow pageNum={currentPage} onPageClick={onPageClick} limit={1} direction={'<'} />
        {currentPage > 3 && (
          <>
            <PageNumber pageNum={1} currentPage={currentPage} onPageClick={onPageClick} />
            {'...'}
          </>
        )}
        {possiblePages.slice(Math.max(0, currentPage - 3), Math.min(numPages, currentPage + 2)).map((p) => (
          <PageNumber key={p} pageNum={p} currentPage={currentPage} onPageClick={onPageClick} />
        ))}
        {currentPage < numPages - 3 && numPages > 3 && (
          <>
            {'...'}
            <PageNumber pageNum={numPages} currentPage={currentPage} onPageClick={onPageClick} />
          </>
        )}
        <PageArrow pageNum={currentPage} onPageClick={onPageClick} limit={numPages} direction={'>'} />
      </div>
      <div className={'app__header-config'}>
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
};

export default AppHeader;
