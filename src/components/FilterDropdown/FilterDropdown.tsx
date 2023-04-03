import * as React from 'react';
import { useEffect, useState } from 'react';
import { FilterIcon } from '../icons';

interface IProps {
  onFilterChange: (filterVal: string) => void;
}

const FilterDropdown = ({ onFilterChange }: IProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const [filterVal, setFilterVal] = useState('');

  useEffect(() => {
    onFilterChange(filterVal);
  }, [filterVal]);

  return (
    <div className={'filter-dropdown'}>
      <span onClick={() => setShowPopover(!showPopover)} tabIndex={0}>
        <FilterIcon />
      </span>
      {showPopover && (
        <div className={'filter-dropdown__popover'}>
          <input
            value={filterVal}
            onChange={(e) => setFilterVal(e.target.value)}
            placeholder={'Filter by PR name or author'}
            autoFocus={true}
            onBlur={() => setShowPopover(false)}
          />
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
