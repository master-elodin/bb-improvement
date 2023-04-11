import * as React from 'react';
import FilterDropdown from './FilterDropdown';
import { IRefreshableFilters, IRowFilters } from '../../types';
import Button from '../Button/Button';

interface IProps {
  defaultFilters: IRefreshableFilters;
  rowFilters: IRowFilters;
  onFilterSelect: (newVal: string, filterType: keyof IRowFilters) => void;
  clearFilters: () => void;
  onGoClick: () => void;
}

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

const DrawerFiltersInPlace = ({ rowFilters, onFilterSelect, clearFilters, onGoClick }: IProps) => {
  return (
    <div className={'drawer-filters__root'}>
      <div className={'drawer-filters__title'}>
        <span className={'drawer-filters__type-title'}>Filter with reload</span>
        <span className={'drawer-filters__clear'} onClick={clearFilters}>
          clear
        </span>
      </div>
      <FilterDropdown
        label={'Selected user is...'}
        options={prTypeOptions}
        defaultValue={rowFilters.role}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'role')}
      />
      <FilterDropdown
        label={'PR state'}
        options={prStateOptions}
        defaultValue={rowFilters.state}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'state')}
      />
      <div className={'drawer-filters__buttons'}>
        <Button onClick={onGoClick} type={'primary'}>
          Go
        </Button>
      </div>
    </div>
  );
};

export default DrawerFiltersInPlace;
