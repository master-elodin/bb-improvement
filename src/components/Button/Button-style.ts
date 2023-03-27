import { HOVER_COLOR } from '../../style-constants';

export const buttonStyle = {
  '.button': {
    border: '1px solid rgba(0, 0, 0, .6)',
    'border-radius': '3px',
    cursor: 'pointer',
    padding: '3px',
    'text-align': 'center',
  },
  '.button:hover': {
    'background-color': HOVER_COLOR,
    'box-shadow': '0 0 3px 1px rgba(150, 150, 150, .2)',
  },
};
