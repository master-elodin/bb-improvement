import * as React from 'react';
import { useState } from 'react';
import { cx } from '../../utils';

interface IProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const Popover = ({ trigger, content }: IProps) => {
  const [show, setShow] = useState(false);
  // TODO: animation?
  // TODO: handle blur

  return (
    <div className={'popover__root'}>
      <div className={'popover__trigger'} onClick={() => setShow(!show)}>
        {trigger}
      </div>
      <div className={cx('popover__content', show && 'popover__content--visible')}>{content}</div>
    </div>
  );
};

export default Popover;
