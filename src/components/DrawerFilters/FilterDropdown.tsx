import * as React from 'react';
import Dropdown, { IProps as IDropdownProps } from '../Dropdown/Dropdown';

interface IProps extends IDropdownProps {
  label: string;
}

const FilterDropdown = ({ label, ...props }: IProps) => (
  <div className={'drawer-filters__filter'}>
    <span className={'drawer-filters__label'}>{label}</span>
    <Dropdown {...props} />
  </div>
);

export default FilterDropdown;
