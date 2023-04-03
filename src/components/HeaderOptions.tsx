import * as React from 'react';
import { FilterType } from '../filters';
import FilterDropdown from './FilterDropdown';
import Button from './Button/Button';
import { PRState } from '../types';
import { FILTER_KEY } from '../api';

interface IProps {
  allBranches: string[];
  onFilterSelect: (newVal: string, filterType: FilterType) => void;
  onPRTypeChange: (newVal: string) => void;
  onPRStateChange: (newVal: PRState) => void;
  onRefreshClick: () => void;
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

const reviewOptions = [
  { label: 'All', value: 'any' },
  { label: 'I have approved', value: 'no' },
  { label: 'I have not approved', value: 'yes' },
];

const savedFilters = JSON.parse(localStorage.getItem(FILTER_KEY) ?? '{}');

const HeaderOptions = ({ allBranches, onFilterSelect, onPRTypeChange, onPRStateChange, onRefreshClick }: IProps) => {
  const targets = allBranches.map((b) => ({ label: b, value: b }));
  targets.unshift({ label: 'All', value: 'any' });
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
        label={'My approval'}
        options={reviewOptions}
        defaultValue={savedFilters.needsReview}
        onSelect={(newVal: string) => onFilterSelect(newVal, 'needsReview')}
        width={'170px'}
      />
      <Button onClick={onRefreshClick} className={'header-options__refresh-button'}>
        <span title={'Refresh'}>&#8635;</span>
      </Button>
    </div>
  );
};

export default HeaderOptions;
