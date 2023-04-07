import * as React from 'react';
import { cx } from '../../utils';

interface IProps {
  open: boolean;
  onOpenChange: (newVal: boolean) => void;
}

const Drawer = ({ open, onOpenChange }: IProps) => {
  return (
    <div className={cx('drawer__root', open && 'drawer__root--open')}>
      <div className={'drawer__toggle'} onClick={() => onOpenChange(!open)}>
        <div className={cx('drawer__toggle-arrow', open && 'drawer__toggle-arrow--open')} />
      </div>
      <h3 className={'drawer__title'}>
        Filters
      </h3>
    </div>
  );
};

export default Drawer;
