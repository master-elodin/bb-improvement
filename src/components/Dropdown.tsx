import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { DownArrow, UpArrow } from './Icons';

export interface IOption {
  value: string;
  label: string;
}

export interface IProps {
  options: IOption[];
  onSelect: (newVal: string) => void;
  allowFilter?: boolean;
  width?: string;
}

const Dropdown = ({ options, onSelect, allowFilter = false, width = '200px' }: IProps) => {
  // TODO: filter
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selected, setSelected] = useState<IOption>();
  const show = useCallback(() => setDropdownVisible(true), []);
  const hide = useCallback(() => setDropdownVisible(false), []);

  useEffect(() => {
    if (!selected) {
      setSelected(options[0]);
    }
  }, [options]);

  const onOptionSelect = (option: IOption) => {
    setSelected(option);
    setDropdownVisible(false);
    onSelect(option.value);
  };

  // TODO: onblur isn't working any more

  return (
    <div className={'dropdown-root'} style={{ width }}>
      <div className={'dropdown-input'}>
        <input defaultValue={selected?.label} readOnly={!allowFilter} onClick={allowFilter ? undefined : show} />
        {dropdownVisible && <UpArrow onClick={hide} />}
        {!dropdownVisible && <DownArrow onClick={show} />}
      </div>
      {dropdownVisible && (
        <div className={'dropdown-dropdown'} onBlur={() => console.log('blurrrr')} tabIndex={0}>
          {options.map((option, index) => (
            <div
              key={option.value}
              className={'dropdown-option'}
              onClick={() => onOptionSelect(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
