import * as React from 'react';
import FilterDropdown from './FilterDropdown';
import { IRowFilters } from '../../types';

interface IProps {
  defaultFilters: IRowFilters;
  rowFilters: IRowFilters;
  allBranches: string[];
  allRepoNames: string[];
  onFilterSelect: (newVal: string, filterType: keyof IRowFilters) => void;
  clearFilters: () => void;
}

const prTypeOptions = [
  { label: 'Reviewing', value: 'reviewer' },
  { label: 'Author', value: 'author' },
  // { label: 'All', value: 'all' },
];

const prStateOptions = [
  { label: 'Open', value: 'OPEN' },
  { label: 'Merged', value: 'MERGED' },
  { label: 'Declined', value: 'DECLINED' },
];

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

const DrawerFilters = ({ rowFilters, allBranches, allRepoNames, onFilterSelect, clearFilters }: IProps) => {
  const targets = allBranches.map((b) => ({ label: b, value: b }));
  targets.unshift({ label: 'All', value: 'any' });
  const repos = allRepoNames.map((b) => ({ label: b, value: b }));
  repos.unshift({ label: 'All', value: 'any' });

  return (
    <>
      <h5 className={'drawer-filters__type-title'}>Filter in place</h5>
      <div className={'drawer-filters__clear'} onClick={clearFilters}>
        clear
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
        onSelect={(newVal: string) => onFilterSelect(newVal, 'branch')}
        allowFilter={true}
      />
      <FilterDropdown
        label={'Repository'}
        options={repos}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'repo')}
      />
      <h5 className={'drawer-filters__type-title'}>Filter with reload</h5>
      <FilterDropdown
        label={'I am...'}
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
    </>
  );
};

export default DrawerFilters;
