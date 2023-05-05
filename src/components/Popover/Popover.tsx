import * as React from 'react';
import { FocusEvent, useEffect, useState } from 'react';
import { cx, handleBlur } from '../../utils';

interface IProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  visible?: boolean;
  onVisibleChange?: (newVal: boolean) => void;
}

const Popover = ({ trigger, content, visible, onVisibleChange }: IProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof visible !== 'undefined') {
      setShow(visible);
    }
  }, [visible]);

  const updateShow = (newVal: boolean) => {
    setShow(newVal);
    onVisibleChange?.(newVal);
  };

  const handleClick = () => updateShow(!(visible === undefined ? show : visible));

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    handleBlur(e, () => {
      updateShow(false);
    });
  };

  return (
    <div className={'popover__root'} onBlur={onBlur} tabIndex={-1}>
      <div className={'popover__trigger'} onClick={handleClick}>
        {trigger}
      </div>
      {show && <div className={'popover__content'}>{content}</div>}
    </div>
  );
};

export default Popover;
