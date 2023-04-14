import * as React from 'react';
import { useEffect, useState } from 'react';
import { IOption, IUser, UserRecord } from '../types';
import FilterDropdown from './DrawerFilters/FilterDropdown';

interface IProps {
  loggedInUserUuid: string;
  onUserChange: (newUser: IUser) => void;
  allUsersById: UserRecord;
}

const UserSelector = ({ onUserChange, loggedInUserUuid, allUsersById }: IProps) => {
  const [userOptions, setUserOptions] = useState<IOption[]>([]);
  useEffect(() => {
    const realCurrentUser = allUsersById[loggedInUserUuid];

    const options = Object.values(allUsersById)
      .filter((u) => u.uuid !== loggedInUserUuid) // only add logged-in user at the start of the list
      .map((u) => ({ label: u.display_name, value: u.uuid }));
    // handle hardcoded data
    const meLabel = !realCurrentUser ? 'Me' : `Me (${realCurrentUser.display_name})`;
    options.unshift({ label: meLabel, value: loggedInUserUuid });
    setUserOptions(options);

    if (realCurrentUser) {
      onUserChange(realCurrentUser);
    }
  }, [allUsersById]);

  return (
    <FilterDropdown
      label={'Selected user'}
      onSelect={(newId: string) => onUserChange(allUsersById[newId])}
      options={userOptions}
      allowFilter={true}
      defaultValue={loggedInUserUuid}
    />
  );
};

export default UserSelector;
