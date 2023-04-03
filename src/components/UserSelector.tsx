import * as React from 'react';
import { useEffect, useState } from 'react';
import { IOption } from './Dropdown/Dropdown';
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
    getAllUsers().then((data) => {
      const usersById = data.reduce((acc, val) => {
        acc[val.uuid] = val;
        return acc;
      }, {} as UserRecord);
      const realCurrentUser = usersById[currentUser.uuid];
      if (realCurrentUser) onUserChange(realCurrentUser);
      setAllUsers(usersById);
    });
  }, []);

  useEffect(() => {
    const options = Object.values(allUsers)
      .filter((u) => u.uuid !== currentUser.uuid) // only add logged-in user at the start of the list
      .map((u) => ({ label: u.display_name, value: u.uuid }));
    const realCurrentUser = allUsers[currentUser.uuid];
    // handle hardcoded data
    const meLabel = !realCurrentUser ? 'Me' : `Me (${realCurrentUser.display_name})`;
    options.unshift({ label: meLabel, value: currentUser.uuid });
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
