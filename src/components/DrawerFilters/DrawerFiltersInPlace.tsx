import * as React from 'react';
import FilterDropdown from './FilterDropdown';
import { IInPlaceFilters, IPRSummarized, IRowFilters } from '../../types';
import { useMemo } from 'react';
import { cx } from '../../utils';

interface IProps {
  defaultFilters: IInPlaceFilters;
  rowFilters: IRowFilters;
  summarized: IPRSummarized;
  onFilterSelect: (newVal: string, filterType: keyof IRowFilters) => void;
  clearFilters: () => void;
  isLoading: boolean;
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

const DrawerFiltersInPlace = ({ rowFilters, summarized, onFilterSelect, clearFilters, isLoading }: IProps) => {
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
        <span className={cx('drawer-filters__clear', 'link')} onClick={clearFilters}>
          clear
        </span>
      </div>
      <FilterDropdown
        label={'I have...'}
        options={needsApprovalOptions}
        defaultValue={rowFilters.needsReview}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'needsReview')}
        disabled={rowFilters.role === 'author' || isLoading}
      />
      <FilterDropdown
        label={'Open tasks'}
        options={taskOptions}
        defaultValue={rowFilters.tasks}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'tasks')}
        disabled={isLoading}
      />
      <FilterDropdown
        label={'Target'}
        options={targets}
        defaultValue={rowFilters.branch}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'branch')}
        allowFilter={true}
        disabled={isLoading}
      />
      <FilterDropdown
        label={'Repository'}
        options={repos}
        defaultValue={rowFilters.repo}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'repo')}
        disabled={isLoading}
      />
      <FilterDropdown
        label={'Author'}
        options={authors}
        defaultValue={rowFilters.author}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'author')}
        allowFilter={true}
        disabled={rowFilters.role === 'author' || isLoading}
      />
    </div>
  );
};

export default DrawerFiltersInPlace;
