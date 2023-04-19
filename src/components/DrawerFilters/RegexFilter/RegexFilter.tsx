import * as React from 'react';
import { useEffect, useState } from 'react';
import { cx } from '../../../utils';

interface IProps {
  defaultValue: string;
  onValueChange: (newVal: string) => void;
}

// for basic debounce
let onChangeTimeout: NodeJS.Timeout;
const RegexFilter = ({ defaultValue, onValueChange }: IProps) => {
  const [regexFilter, setRegexFilter] = useState(defaultValue);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setRegexFilter(defaultValue);
  }, [defaultValue])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.currentTarget.value;
    setRegexFilter(newVal);
    if (onChangeTimeout) {
      clearTimeout(onChangeTimeout);
    }
    onChangeTimeout = setTimeout(() => {
      const valWithSyntax = newVal.trim().replace(/^\/|\/$/g, '');
      setRegexFilter(valWithSyntax);
      if (valWithSyntax.length) {
        try {
          new RegExp(valWithSyntax); // fail before changing the real value if it's not a valid regex
          setIsInvalid(false);
          onValueChange(valWithSyntax);
        } catch (err: any) {
          console.log(`Invalid regex ${valWithSyntax} :: `, err.message)
          setIsInvalid(true);
        }
      } else {
        onValueChange(valWithSyntax);
      }
    }, 1000);
  };

  return (
    <div className={'drawer-filters__filter'}>
      <span className={'drawer-filters__label'}>Filter by regex</span>
      <div className={cx('dropdown-root', regexFilter && 'dropdown-root--show-changed')}>
        <div className={'dropdown-input'}>
          <input
            className={cx('regex-filter-input', isInvalid && 'regex-filter-input--invalid')}
            value={regexFilter}
            onChange={onInputChange}
            placeholder={'(4.2.0)|(lukasz)'}
            autoFocus={true}
          />
          <div className={'regex-filter-input__prefix'}>/</div>
          <div className={'regex-filter-input__postfix'}>/<span>gi</span></div>
        </div>
      </div>
    </div>
  );
};

export default RegexFilter;
