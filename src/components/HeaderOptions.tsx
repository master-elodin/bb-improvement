import * as React from 'react';
import { FilterType } from '../filters';
import FilterDropdown from './FilterDropdown';
import Button from './Button/Button';

interface IProps {
  allBranches: string[];
  onFilterSelect: (newVal: string, filterType: FilterType) => void;
  onPRTypeChange: (newVal: string) => void;
  onRefreshClick: () => void;
}

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

const HeaderOptions = ({ allBranches, onFilterSelect, onPRTypeChange, onRefreshClick }: IProps) => {
  const targets = allBranches.map((b) => ({ label: b, value: b }));
  targets.unshift({ label: 'All', value: 'any' });
  return (
    <div className={'header-options__root'}>
      <FilterDropdown
        label={'I am...'}
        options={[{label: 'Reviewing', value: 'reviewer'}, {label: 'Author', value: 'author'}]}
        onSelect={onPRTypeChange}
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
        onSelect={(newVal: string) => onFilterSelect(newVal, 'tasks')}
        width={'150px'}
      />
      <FilterDropdown
        label={'My approval'}
        options={reviewOptions}
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
