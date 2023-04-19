import * as React from 'react';
import FilterDropdown from './FilterDropdown';
import { IInPlaceFilters, IPRSummarized } from '../../types';
import { useMemo } from 'react';
import { cx } from '../../utils';
import RegexFilter from './RegexFilter/RegexFilter';
import SavedRegexDropdown from './RegexFilter/SavedRegexDropdown';

interface IProps {
  inPlaceFilters: IInPlaceFilters;
  summarized: IPRSummarized;
  onFilterSelect: (newVal: string, filterType: keyof IInPlaceFilters) => void;
  clearFilters: () => void;
  isLoading: boolean;
}

const taskOptions: { label: string; value: IInPlaceFilters['tasks'] }[] = [
  { label: 'Any tasks', value: 'any' },
  { label: 'Has open tasks', value: 'yes' },
  { label: 'No open tasks', value: 'no' },
];

const needsApprovalOptions: { label: string; value: IInPlaceFilters['needsReview'] }[] = [
  { label: 'All', value: 'any' },
  { label: 'Not approved', value: 'yes' },
  { label: 'Approved', value: 'no' },
  { label: 'Requested changes', value: 'changesRequested' },
];

const buildOptions: { label: string; value: IInPlaceFilters['build'] }[] = [
  { label: 'All', value: 'any' },
  { label: 'Successful', value: 'SUCCESSFUL' },
  { label: 'In progress', value: 'INPROGRESS' },
  { label: 'Failed', value: 'FAILED' },
];

const DrawerFiltersInPlace = ({ inPlaceFilters, summarized, onFilterSelect, clearFilters, isLoading }: IProps) => {
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

  return (
    <div className={'drawer-filters__root'}>
      <div className={'drawer-filters__title'}>
        <span className={'drawer-filters__type-title'}>Filter in place</span>
        <span className={cx('drawer-filters__clear', 'link')} onClick={clearFilters}>
          clear
        </span>
      </div>
      <RegexFilter
        defaultValue={inPlaceFilters.regex}
        onValueChange={(newVal: string) => onFilterSelect(newVal, 'regex')}
      />
      <SavedRegexDropdown
        currentRegex={inPlaceFilters.regex}
        onValueChange={(newVal: string) => onFilterSelect(newVal, 'regex')}
      />
      <FilterDropdown
        label={'I have...'}
        options={needsApprovalOptions}
        defaultValue={inPlaceFilters.needsReview}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'needsReview')}
        disabled={isLoading}
      />
      <FilterDropdown
        label={'Open tasks'}
        options={taskOptions}
        defaultValue={inPlaceFilters.tasks}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'tasks')}
        disabled={isLoading}
      />
      <FilterDropdown
        label={'Target'}
        options={targets}
        defaultValue={inPlaceFilters.branch}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'branch')}
        allowFilter={true}
        disabled={isLoading}
      />
      <FilterDropdown
        label={'Repository'}
        options={repos}
        defaultValue={inPlaceFilters.repo}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'repo')}
        disabled={isLoading}
      />
      <FilterDropdown
        label={'Build status'}
        options={buildOptions}
        defaultValue={inPlaceFilters.build}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'build')}
        disabled={isLoading}
      />
    </div>
  );
};

export default DrawerFiltersInPlace;
