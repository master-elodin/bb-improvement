import * as React from 'react';
import FilterDropdown from './FilterDropdown';
import { IInPlaceFilters, IPRSummarized, IRowFilters } from '../../types';
import { useMemo } from 'react';

interface IProps {
  defaultFilters: IInPlaceFilters;
  rowFilters: IRowFilters;
  summarized: IPRSummarized;
  onFilterSelect: (newVal: string, filterType: keyof IRowFilters) => void;
  clearFilters: () => void;
}

const taskOptions = [
  { label: 'Any tasks', value: 'any' },
  { label: 'Has open tasks', value: 'yes' },
  { label: 'No open tasks', value: 'no' },
];

const needsApprovalOptions = [
  { label: 'All', value: 'any' },
  { label: 'Not approved', value: 'yes' },
  { label: 'Approved', value: 'no' },
  { label: 'Requested changes', value: 'changesRequested' },
];

const DrawerFiltersInPlace = ({ rowFilters, summarized, onFilterSelect, clearFilters }: IProps) => {
  const targets = useMemo(
    () => [
      { label: 'All', value: 'any' },
      ...summarized.branches.map((value: string) => ({
        label: value,
        value,
      })),
    ],
    [summarized.branches],
  );
  const repos = useMemo(
    () => [
      { label: 'All', value: 'any' },
      ...summarized.repos.map((value: string) => ({
        label: value,
        value,
      })),
    ],
    [summarized.repos],
  );
  const authors = useMemo(
    () => [
      { label: 'All', value: 'any' },
      ...summarized.authors,
    ],
    [summarized.authors],
  );

  return (
    <div className={'drawer-filters__root'}>
      <div className={'drawer-filters__title'}>
        <span className={'drawer-filters__type-title'}>Filter in place</span>
        <span className={'drawer-filters__clear'} onClick={clearFilters}>
          clear
        </span>
      </div>
      <FilterDropdown
        label={'I have...'}
        options={needsApprovalOptions}
        defaultValue={rowFilters.needsReview}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'needsReview')}
      />
      <FilterDropdown
        label={'Open tasks'}
        options={taskOptions}
        defaultValue={rowFilters.tasks}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'tasks')}
      />
      <FilterDropdown
        label={'Target'}
        options={targets}
        defaultValue={rowFilters.branch}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'branch')}
        allowFilter={true}
      />
      <FilterDropdown
        label={'Repository'}
        options={repos}
        defaultValue={rowFilters.repo}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'repo')}
      />
      <FilterDropdown
        label={'Author'}
        options={authors}
        defaultValue={rowFilters.author}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'author')}
      />
    </div>
  );
};

export default DrawerFiltersInPlace;
