import * as React from 'react';
import { FilterType } from '../../filters';
import FilterDropdown from './FilterDropdown';
import { PRState } from '../../types';
import { FILTER_KEY } from '../../api';

interface IProps {
  allBranches: string[];
  allRepoNames: string[];
  onFilterSelect: (newVal: string, filterType: FilterType) => void;
  onPRTypeChange: (newVal: string) => void;
  onPRStateChange: (newVal: PRState) => void;
}

const prTypeOptions = [
  { label: 'Reviewing', value: 'reviewer' },
  { label: 'Author', value: 'author' },
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

const savedFilters = JSON.parse(localStorage.getItem(FILTER_KEY) ?? '{}');

const HeaderOptions = ({ allBranches, allRepoNames, onFilterSelect, onPRTypeChange, onPRStateChange }: IProps) => {
  const targets = allBranches.map((b) => ({ label: b, value: b }));
  targets.unshift({ label: 'All', value: 'any' });
  const repos = allRepoNames.map((b) => ({ label: b, value: b }));
  repos.unshift({ label: 'All', value: 'any' });
  return (
    <div className={'header-options__root'}>
      <FilterDropdown
        label={'I am...'}
        options={prTypeOptions}
        defaultValue={prTypeOptions[savedFilters.isReviewing === 'false' ? 1 : 0].value}
        onSelect={onPRTypeChange}
      />
      <FilterDropdown
        label={'PR state'}
        options={prStateOptions}
        defaultValue={savedFilters.prState}
        onSelect={(newVal) => onPRStateChange(newVal as PRState)}
        width={'110px'}
      />
      <FilterDropdown
        label={'Repository'}
        options={repos}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'repo')}
        width={'140px'}
      />
      <FilterDropdown
        label={'Target'}
        options={targets}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'branch')}
        allowFilter={true}
      />
      <FilterDropdown
        label={'Open tasks'}
        options={taskOptions}
        defaultValue={savedFilters.tasks}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'tasks')}
        width={'150px'}
      />
      <FilterDropdown
        label={'I have...'}
        options={needsApprovalOptions}
        defaultValue={savedFilters.needsReview}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'needsReview')}
        width={'170px'}
      />
    </div>
  );
};

export default HeaderOptions;
