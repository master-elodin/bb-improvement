import * as React from 'react';
import { FocusEvent, useCallback, useRef, useState } from 'react';
import { FilterIcon } from '../icons';
import { handleBlur } from '../../utils';

interface IProps {
  onFilterChange: (filterVal: string) => void;
}

// for basic debounce
let onChangeTimeout: NodeJS.Timeout;
const FilterDropdown = ({ onFilterChange }: IProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const [filterVal, setFilterVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback((newVal: string) => {
    setFilterVal(newVal);
    if (onChangeTimeout) {
      clearTimeout(onChangeTimeout);
    }
    onChangeTimeout = setTimeout(() => {
      onFilterChange(newVal);
    }, 500);
  }, []);

  const onClearClick = () => {
    setFilterVal('');
    onFilterChange('');
    inputRef.current?.focus();
  };

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    handleBlur(e, () => setShowPopover(false));
  };

  return (
    <div className={'filter-dropdown'} onBlur={onBlur} tabIndex={0}>
      <span onClick={() => setShowPopover(!showPopover)}>
        <FilterIcon />
      </span>
      {showPopover && (
        <div className={'filter-dropdown__popover'}>
          <input
            ref={inputRef}
            value={filterVal}
            onChange={(e) => onChange(e.target.value)}
            placeholder={'Separate by comma. ! to negate'}
            autoFocus={true}
          />
          {filterVal.length > 0 && (
            <div className={'filter-dropdown__clear-btn'} onClick={onClearClick}>
              &times;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
