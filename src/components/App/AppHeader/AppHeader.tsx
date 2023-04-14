import * as React from 'react';
import Button from '../../Button/Button';
import DarkModeToggle from '../DarkModeToggle';
import PageSelector from './PageSelector';

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
  return (
    <div className={'app-header__root'}>
      {userSelector}
      {/*{!loading && (*/}
      {/*  <UserStats userUuid={currentUser.uuid} />*/}
      {/*)}*/}
      <Button onClick={onRefreshClick} className={'app-header__refresh-btn'}>
        <span>&#8635; Refresh</span>
      </Button>
      <PageSelector currentPage={currentPage} possiblePages={possiblePages} onPageClick={onPageClick} />
      <div className={'app__header-config'}>
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
};

export default AppHeader;
