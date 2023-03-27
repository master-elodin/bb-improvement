import * as React from 'react';
import { useEffect, useState } from 'react';
import Dropdown, { IOption } from './Dropdown';
import { getAllUsers } from '../api';
import { IUser } from '../types';

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
    setUserOptions(Object.values(allUsers).map((u) => ({ label: u.display_name, value: u.uuid })));
  }, [allUsers]);

  return (
    <Dropdown
      selected={{ label: currentUser.display_name, value: currentUser.uuid }}
      onSelect={(newId: string) => onUserChange(allUsers[newId])}
      options={userOptions}
    />
  );
};

export default UserSelector;
