import * as React from 'react';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../api';
import { IOption, IUser } from '../types';
import FilterDropdown from './DrawerFilters/FilterDropdown';

interface IProps {
  loggedInUserUuid: string;
  onUserChange: (newUser: IUser) => void;
}

type UserRecord = { [uuid: string]: IUser };

const UserSelector = ({ onUserChange, loggedInUserUuid }: IProps) => {
  const [allUsers, setAllUsers] = useState<UserRecord>({});
  const [userOptions, setUserOptions] = useState<IOption[]>([]);
  useEffect(() => {
    getAllUsers().then((data) => {
      const usersById = data.reduce((acc, val) => {
        acc[val.uuid] = val;
        return acc;
      }, {} as UserRecord);
      const realCurrentUser = usersById[loggedInUserUuid];

      const options = Object.values(data)
        .filter((u) => u.uuid !== loggedInUserUuid) // only add logged-in user at the start of the list
        .map((u) => ({ label: u.display_name, value: u.uuid }));
      // handle hardcoded data
      const meLabel = !realCurrentUser ? 'Me' : `Me (${realCurrentUser.display_name})`;
      options.unshift({ label: meLabel, value: loggedInUserUuid });
      setUserOptions(options);

      if (realCurrentUser) {
        onUserChange(realCurrentUser);
      }

      setAllUsers(usersById);
    });
  }, []);

  return (
    <FilterDropdown
      label={'Selected user'}
      onSelect={(newId: string) => onUserChange(allUsers[newId])}
      options={userOptions}
      allowFilter={true}
    />
  );
};

export default UserSelector;
