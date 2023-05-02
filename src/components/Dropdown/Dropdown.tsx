import { FocusEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { DownArrow, UpArrow } from '../Icons/Icons';
import { cx, handleBlur } from '../../utils';
import { IOption } from '../../types';

export interface IProps {
  options: IOption[];
  defaultValue?: string;
  value?: string; // to manually change selected
  onSelect: (newVal: string) => void;
  allowFilter?: boolean;
  width?: string;
  disabled?: boolean;
  shadowChanged?: boolean;
  selectOnOptionsChange?: boolean;
}

const Dropdown = ({
  options,
  defaultValue,
  value,
  onSelect,
  allowFilter = false,
  width,
  disabled,
  shadowChanged,
  selectOnOptionsChange = true,
}: IProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selected, setSelected] = useState<IOption | undefined>();
  const [filterVal, setFilterVal] = useState<string>(selected?.label ?? '');
  const [prevFilterVal, setPrevFilterVal] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const show = useCallback(() => setDropdownVisible(true), []);
  const hide = useCallback(() => setDropdownVisible(false), []);

  const setNextFilter = (newVal: string) => {
    setFilterVal(newVal);
    setPrevFilterVal(newVal);
  };

  useEffect(() => {
    const option = options.find((o) => o.value === value);
    if (option) {
      setSelected(option);
    }
  }, [options, value]);

  useEffect(() => {
    // needs to exist to populate after the first render
    setNextFilter(selected?.label ?? '');
  }, [selected?.label]);

  useEffect(() => {
    if (selectOnOptionsChange || !selected) {
      setSelected(options.find((o) => o.value === (value ?? defaultValue)));
    }
  }, [value, defaultValue, options]);

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilterVal(e.currentTarget.value);

  const onClearClick = () => {
    setFilterVal('');
    inputRef.current?.focus();
  };

  const onOptionSelect = (e: React.MouseEvent<HTMLDivElement>, option: IOption) => {
    e.stopPropagation();
    setSelected(option);
    // need to set here too, in case the same option was selected again
    setNextFilter(option.label);

    setDropdownVisible(false);
    onSelect(option.value);
  };

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    handleBlur(e, () => {
      // nothing was selected, so clear any filter typed in
      setFilterVal(prevFilterVal);
      hide();
    });
  };

  let filterInput: React.ReactNode;
  if (allowFilter) {
    const onInputFocus = () => {
      setFilterVal('');
      show();
    };
    filterInput = <input ref={inputRef} value={filterVal} onChange={onFilterChange} onFocus={onInputFocus} />;
  } else {
    filterInput = <input defaultValue={selected?.label} readOnly={true} onClick={show} />;
  }

  let filteredOptions = options.filter(
    (option) => !allowFilter || option.label.toLowerCase().indexOf(filterVal.toLowerCase()) > -1,
  );
  return (
    <div
      className={cx(
        'dropdown-root',
        disabled && 'dropdown-root--disabled',
        shadowChanged && selected?.value !== defaultValue && 'dropdown-root--show-changed',
      )}
      style={{ width }}
      onBlur={onBlur}
      tabIndex={-1}>
      <div className={'dropdown-input'}>
        {filterInput}
        {allowFilter && filterVal.length > 0 && (
          <div className={'dropdown__clear-btn'} onClick={onClearClick}>
            &times;
          </div>
        )}
        {dropdownVisible && <UpArrow onClick={hide} />}
        {!dropdownVisible && <DownArrow onClick={show} />}
      </div>
      {dropdownVisible && (
        <div className={'dropdown-dropdown'}>
          {filteredOptions.length === 0 && (
            <div className={'dropdown-option dropdown-option--no-results'}>No results</div>
          )}
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              className={'dropdown-option'}
              onClick={(e) => onOptionSelect(e, option)}
              tabIndex={index}
              title={option.label}>
              {option.rendered ?? option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
