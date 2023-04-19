import * as React from 'react';
import { cx } from '../../utils';

interface IProps {
  isLoading: boolean;
  open: boolean;
  onOpenChange: (newVal: boolean) => void;
  numVisible: number;
  numTotal: number;
}

const Drawer = ({ isLoading, open, onOpenChange, numVisible, numTotal, children }: React.PropsWithChildren<IProps>) => {
  const onDrawerClick = () => {
    if (!open) {
      onOpenChange(true);
    }
  };
  return (
    <div className={cx('drawer__root', open && 'drawer__root--open')} onClick={onDrawerClick}>
      <div className={'drawer__header'} onClick={() => onOpenChange(!open)}>
        <div className={'drawer__header-title-container'}>
          <div className={'drawer__toggle'}>
            <div className={cx('drawer__toggle-arrow', open && 'drawer__toggle-arrow--open')} />
          </div>
          {open && <h3 className={'drawer__title'}>Filters</h3>}
        </div>
        {!isLoading && open && numTotal > 0 && (
          <div className={'drawer__num-visible'}>
            {numVisible} of {numTotal} visible
          </div>
        )}
      </div>
      {open && <div className={'drawer__content'}>{children}</div>}
    </div>
  );
};

export default Drawer;
