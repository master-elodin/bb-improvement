import * as React from 'react';
import { PropsWithChildren, useEffect } from 'react';

interface IProps {
  show?: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ show, onClose, title, children }: PropsWithChildren<IProps>) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (show) {
      document.body.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, show]);

  if (!show) {
    return null;
  }
  return (
    <div className={'modal__root'}>
      <div className={'modal__wrap'} />
      <div className={'modal__body'}>
        <div className={'modal__title'}>{title}</div>
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
