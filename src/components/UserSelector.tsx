import * as React from 'react';
import { useEffect, useState } from 'react';
import { IOption } from './Dropdown';
import { getAllUsers } from '../api';
import { IUser } from '../types';
import FilterDropdown from './FilterDropdown';
import { loggedInUserUuid } from '../constants';

interface IProps {
  currentUser: IUser;
  onUserChange: (newUser: IUser) => void;
}

type UserRecord = { [uuid: string]: IUser };

const UserSelector = ({ currentUser, onUserChange }: IProps) => {
  const [allUsers, setAllUsers] = useState<UserRecord>({});
  const [userOptions, setUserOptions] = useState<IOption[]>([]);
  useEffect(() => {
    getAllUsers().then((data) =>
      setAllUsers(
        data.reduce((acc, val) => {
          acc[val.uuid] = val;
          return acc;
        }, {} as UserRecord),
      ),
    );
  }, []);

  useEffect(() => {
    const options = Object.values(allUsers).map((u) => ({ label: u.display_name, value: u.uuid }));
    options.unshift({ label: 'Me', value: loggedInUserUuid });
    setUserOptions(options);
  }, [allUsers]);

  return (
    <FilterDropdown
      label={'Reviewer'}
      onSelect={(newId: string) => onUserChange(allUsers[newId])}
      options={userOptions}
      allowFilter={true}
    />
  );
};

export default UserSelector;
