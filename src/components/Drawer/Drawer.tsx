import * as React from 'react';
import { cx } from '../../utils';

interface IProps {
  open: boolean;
  onOpenChange: (newVal: boolean) => void;
}

const Drawer = ({ open, onOpenChange, children }: React.PropsWithChildren<IProps>) => {
  const onDrawerClick = () => {
    if (!open) {
      onOpenChange(true);
    }
  };
  return (
    <div className={cx('drawer__root', open && 'drawer__root--open')} onClick={onDrawerClick}>
      <div className={'drawer__header'} onClick={() => onOpenChange(!open)}>
        <div className={'drawer__toggle'}>
          <div className={cx('drawer__toggle-arrow', open && 'drawer__toggle-arrow--open')} />
        </div>
        <h3 className={'drawer__title'}>Filters</h3>
      </div>
      {open && <div className={'drawer__content'}>{children}</div>}
    </div>
  );
};

export default Drawer;
