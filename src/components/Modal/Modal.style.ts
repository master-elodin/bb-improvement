import { flexCentered } from '../../styleUtils';

export const modalStyle = {
  '.modal__root': {
    ...flexCentered,
    height: '100vh',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100vw',
    'z-index': 5,
  },
  '.modal__wrap': {
    'background-color': '#00000080',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  '.modal__body': {
    'background-color': 'var(--color-background)',
    'border-radius': '5px',
    'box-shadow': 'var(--shadow-basic)',
    display: 'flex',
    'flex-direction': 'column',
    height: '400px',
    padding: '10px',
    position: 'relative',
    width: '600px',
    'z-index': 2,
  },
  '.modal__content': {
    height: 'calc(100% - 30px)',
  },
  '.modal__title': {
    'font-size': '1.3em',
    'font-weight': 'bold',
    'margin-bottom': '10px',
  },
  '.modal__close-btn': {
    cursor: 'pointer',
    position: 'absolute',
    padding: '5px',
    right: '10px',
    top: '5px',
  },
};
