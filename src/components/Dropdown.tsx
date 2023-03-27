import { FocusEvent, useCallback, useEffect, useState } from 'react';
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

  const onOptionSelect = (e: React.MouseEvent<HTMLDivElement>, option: IOption) => {
    e.stopPropagation();
    setSelected(option);
    setDropdownVisible(false);
    onSelect(option.value);
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;

    // gratefully copied from https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        hide();
      }
    });
  };

  return (
    <div className={'dropdown-root'} style={{ width }} onBlur={handleBlur} tabIndex={-1}>
      <div className={'dropdown-input'}>
        <input defaultValue={selected?.label} readOnly={!allowFilter} onClick={allowFilter ? undefined : show} />
        {dropdownVisible && <UpArrow onClick={hide} />}
        {!dropdownVisible && <DownArrow onClick={show} />}
      </div>
      {dropdownVisible && (
        <div className={'dropdown-dropdown'}>
          {options.map((option, index) => (
            <div
              key={option.value}
              className={'dropdown-option'}
              onClick={(e) => onOptionSelect(e, option)}
              tabIndex={index}
              title={option.label}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
