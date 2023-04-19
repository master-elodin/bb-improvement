import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import DarkModeToggle from '../DarkModeToggle';
import PageSelector from './PageSelector';
import { BucketIcon, DownArrow, PoopIcon, UserIcon } from '../../Icons/Icons';
import Popover from '../../Popover/Popover';
import { cx } from '../../../utils';
import { IAPIFilters, IUser, UserRecord } from '../../../types';
import FilterDropdown from '../../DrawerFilters/FilterDropdown';
import UserSelector from '../../UserSelector';
import { API_FILTER_KEY } from '../../../api';

const prTypeOptions = [
  { label: 'Reviewing', value: 'reviewers' },
  { label: 'Author', value: 'author' },
  { label: 'Irrelevant', value: 'all' },
];

const prStateOptions = [
  { label: 'Open', value: 'OPEN' },
  { label: 'Merged', value: 'MERGED' },
  { label: 'Declined', value: 'DECLINED' },
];

interface IProps {
  refresh: (filters: IAPIFilters) => void;
  onUserChange: (newUuid: string) => void;
  loggedInUserUuid: string;
  allUsersById: UserRecord;
  isDarkMode: boolean;
  setIsDarkMode: (newVal: boolean) => void;
  possiblePages: number[];
}

const saveFilters = (newVal: IAPIFilters) => localStorage.setItem(API_FILTER_KEY, JSON.stringify(newVal));
const savedApiFilters: IAPIFilters = {
  role: 'reviewers',
  state: 'OPEN',
  ...JSON.parse(localStorage.getItem(API_FILTER_KEY) ?? '{}'),
  pageNum: 1, // always use page 1 on page reload,
};

const AppHeader = ({
  refresh,
  onUserChange,
  loggedInUserUuid,
  allUsersById,
  isDarkMode,
  setIsDarkMode,
  possiblePages,
}: IProps) => {
  const [loadVisible, setLoadVisible] = useState(false);
  const [apiFilters, setApiFilters] = useState<IAPIFilters>({
    ...savedApiFilters,
    userUuid: loggedInUserUuid,
  });
  const [showPages, setShowPages] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser>({ uuid: loggedInUserUuid, display_name: 'Me' } as IUser);

  useEffect(() => {
    const realCurrentUser = allUsersById[loggedInUserUuid];
    if (realCurrentUser && currentUser !== realCurrentUser) {
      setCurrentUser(realCurrentUser);
      refresh({
        ...apiFilters,
        // make sure it uses the latest uuid so there's no race condition
        userUuid: realCurrentUser.uuid,
      });
    }
  }, [allUsersById]);

  useEffect(() => {
    onFilterSelect(currentUser.uuid, 'userUuid');
    // TODO: don't actually update until requesting data, so approval doesn't change
    onUserChange(currentUser.uuid);
  }, [currentUser]);

  useEffect(() => {
    saveFilters(apiFilters);
  }, [apiFilters]);

  const onFilterSelect = (newVal: string, filterType: keyof IAPIFilters) => {
    if (apiFilters[filterType] === newVal) {
      // nothing to do
      return;
    }
    setApiFilters((prevState: IAPIFilters) => ({
      ...prevState,
      [filterType]: newVal,
    }));
  };

  const onPageClick = (pageNum: number) => {
    if (pageNum === apiFilters.pageNum) {
      return;
    }
    setApiFilters((prevState) => {
      const newFilters = {
        ...prevState,
        pageNum,
      };
      refresh(newFilters);
      return newFilters;
    });
  };

  // TODO: don't show pages if there's nothing loaded yet?
  // TODO: disable button on load
  const loadTrigger = (
    <div className={cx('app-header__request-trigger', loadVisible && 'app-header__request-trigger--open')}>
      <DownArrow />
    </div>
  );
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFilterSelect(e.currentTarget.value.replace(/"/g, ''), 'text');
  const loadContent = (
    <div className={'app-header__request-content'}>
      <UserSelector loggedInUserUuid={loggedInUserUuid} onUserChange={setCurrentUser} allUsersById={allUsersById} />
      <FilterDropdown
        label={'Selected user is...'}
        options={prTypeOptions}
        defaultValue={savedApiFilters.role}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'role')}
        shadowChanged={false}
      />
      <FilterDropdown
        label={'PR state'}
        options={prStateOptions}
        defaultValue={savedApiFilters.state}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'state')}
        shadowChanged={false}
      />
      <div className={'drawer-filters__filter'}>
        <span className={'drawer-filters__label'}>Freeform text</span>
        <div className={'dropdown-input'}>
          <input
            value={apiFilters.text}
            onChange={onTextChange}
            placeholder={'PR title or description'}
            autoFocus={true}
          />
          {apiFilters.text && (
            <div className={'app-header__text-clear-btn'} onClick={() => onFilterSelect('', 'text')}>
              &times;
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const userTrigger = (
    <div className={'app-header__user-button'}>
      <UserIcon />
    </div>
  );
  const userContent = (
    <div className={'app-header__user-config-content'}>
      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );

  const onRequestClick = async () => {
    setLoadVisible(false);
    setShowPages(false);
    await refresh({ ...apiFilters, pageNum: 1 });
    setShowPages(true);
  };

  return (
    <div className={'app-header__root'}>
      <div className={'app-header__title'}>
        <PoopIcon />
        <BucketIcon />
        <span className={'app-header__title-text'}>List Improver</span>
      </div>
      {/*{!loading && (*/}
      {/*  <UserStats userUuid={currentUser.uuid} />*/}
      {/*)}*/}
      <PageSelector
        visible={showPages}
        currentPage={apiFilters.pageNum}
        possiblePages={possiblePages}
        onPageClick={onPageClick}
      />
      <div className={'app-header__config'}>
        <div className={'app-header__request-container'}>
          <Button onClick={onRequestClick} type={'primary'}>
            Request Data
          </Button>
          <Popover trigger={loadTrigger} content={loadContent} visible={loadVisible} onVisibleChange={setLoadVisible} />
        </div>
        <Popover trigger={userTrigger} content={userContent} />
      </div>
    </div>
  );
};

export default AppHeader;
