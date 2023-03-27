import { useState } from 'react';
import * as React from 'react';
import { DownArrow, UpArrow } from './Icons';

export interface IOption {
  value: string;
  label: string;
}

interface IProps {
  selected?: IOption;
  options: IOption[];
  onSelect: (newVal: string) => void;
}

const Dropdown = ({ selected, options, onSelect }: IProps) => {
  // TODO: filter
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const onOptionSelect = (newVal: string) => {
    setDropdownVisible(false);
    onSelect(newVal);
  };
  // TODO: onBlur hide
  return (
    <div className={'dropdown-root'}>
      <div className={'dropdown-input'}>
        <input value={selected?.label} />
        {dropdownVisible && <UpArrow onClick={() => setDropdownVisible(false)} />}
        {!dropdownVisible && <DownArrow onClick={() => setDropdownVisible(true)} />}
      </div>
      {dropdownVisible && (
        <div className={'dropdown-dropdown'}>
          {options.map((option) => (
            <div key={option.value} className={'dropdown-option'} onClick={() => onOptionSelect(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
