import * as React from 'react';
import { cx } from '../../utils';

interface IProps {
  isDarkMode: boolean;
  setIsDarkMode: (newVal: boolean) => void;
}

const sun = <>☀️</>;
const moon = <>🌙</>;

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }: IProps) => {
  return (
    <div
      className={cx('dark-mode-toggle', isDarkMode && 'dark-mode-toggle--on')}
      onClick={() => setIsDarkMode(!isDarkMode)}>
      <div className={cx('dark-mode-toggle__icon', 'dark-mode-toggle__sun')}>{sun}</div>
      <div className={cx('dark-mode-toggle__icon', 'dark-mode-toggle__moon')}>{moon}</div>
      <div className={'dark-mode-toggle__slider'} />
    </div>
  );
};

export default DarkModeToggle;
