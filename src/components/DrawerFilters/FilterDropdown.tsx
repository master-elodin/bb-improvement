import * as React from 'react';
import Dropdown, { IProps as IDropdownProps } from '../Dropdown/Dropdown';

interface IProps extends IDropdownProps {
  label: string;
}

const FilterDropdown = ({ label, options, defaultValue, onSelect, allowFilter, width }: IProps) => (
  <div className={'drawer-filters__filter'}>
    <span className={'drawer-filters__label'}>{label}</span>
    <Dropdown
      options={options}
      defaultValue={defaultValue}
      onSelect={onSelect}
      allowFilter={allowFilter}
      width={width}
    />
  </div>
);

export default FilterDropdown;
