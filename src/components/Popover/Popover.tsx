import * as React from 'react';
import { useEffect, useState } from 'react';
import { cx } from '../../utils';

interface IProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  visible?: boolean;
  onVisibleChange?: (newVal: boolean) => void;
}

const Popover = ({ trigger, content, visible, onVisibleChange }: IProps) => {
  const [show, setShow] = useState(false);
  // TODO: handle blur

  useEffect(() => {
    if (typeof visible !== 'undefined') {
      setShow(visible);
    }
  }, [visible]);

  const handleClick = () => {
    const newVal = !(visible === undefined ? show : visible);
    setShow(newVal);
    onVisibleChange?.(newVal);
  };

  return (
    <div className={'popover__root'}>
      <div className={'popover__trigger'} onClick={handleClick}>
        {trigger}
      </div>
      <div className={cx('popover__content', show && 'popover__content--visible')}>{content}</div>
    </div>
  );
};

export default Popover;
