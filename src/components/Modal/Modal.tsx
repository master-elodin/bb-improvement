import * as React from 'react';
import { PropsWithChildren } from 'react';

interface IProps {
  show?: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ show, onClose, title, children }: PropsWithChildren<IProps>) => {
  if (!show) {
    return null;
  }
  return (
    <div className={'modal__root'}>
      <div className={'modal__wrap'} />
      <div className={'modal__body'}>
        <div className={'modal__title'}>
          {title}
        </div>
        <div className={'modal__content'}>
          <div className={'modal__close-btn'} onClick={onClose}>
            &times;
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
