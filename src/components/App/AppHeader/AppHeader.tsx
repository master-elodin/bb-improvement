import * as React from 'react';
import Button from '../../Button/Button';
import DarkModeToggle from '../DarkModeToggle';
import PageSelector from './PageSelector';
import { UserIcon } from '../../Icons/Icons';
import Popover from '../../Popover/Popover';
import { cx } from '../../../utils';

interface IProps {
  onRefreshClick: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (newVal: boolean) => void;
  currentPage: number;
  possiblePages: number[];
  onPageClick: (newVal: number) => void;
  userSelector: React.ReactNode;
  isUserChanged: boolean;
}

const AppHeader = ({
  onRefreshClick,
  isDarkMode,
  setIsDarkMode,
  currentPage,
  possiblePages,
  onPageClick,
  userSelector,
                     isUserChanged,
}: IProps) => {
  // TODO: don't show pages if there's nothing loaded yet?
  const userContent = (
    <div className={'app-header__user-config-content'}>
      {userSelector}
      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
  return (
    <div className={'app-header__root'}>
      {/*{!loading && (*/}
      {/*  <UserStats userUuid={currentUser.uuid} />*/}
      {/*)}*/}
      <Button onClick={onRefreshClick} className={'app-header__refresh-btn'}>
        <span>&#8635; Refresh</span>
      </Button>
      <PageSelector currentPage={currentPage} possiblePages={possiblePages} onPageClick={onPageClick} />
      <div className={'app-header__config'}>
        <Popover
          trigger={
            <div className={cx('app-header__user-button', isUserChanged && 'app-header__user-button--changed')}>
              <UserIcon />
            </div>
          }
          content={userContent}
        />
      </div>
    </div>
  );
};

export default AppHeader;
