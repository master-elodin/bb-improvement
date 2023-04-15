import { HOVER_COLOR } from '../../style-constants';

export const buttonStyle = {
  '.button': {
    '--button-border': '1px solid var(--color-border)',
    border: 'var(--button-border)',
    'border-radius': '3px',
    cursor: 'pointer',
    padding: '3px',
    'text-align': 'center',
  },
  '.button:hover': {
    'background-color': HOVER_COLOR, // TODO
    'box-shadow': '0 0 3px 1px rgba(150, 150, 150, .2)',
  },
  '.button--primary': {
    '--button-border': '#3773eb',
    'background-color': 'var(--button-border)',
    border: 'none',
    color: 'white',
    'font-weight': 'bold',
    padding: '4px 8px',
  },
  '.button--primary:hover': {
    'background-color': '#417DF5',
  },
  '.button--danger': {
    '--button-border': '#d82f2c',
    'background-color': 'var(--button-border)',
    border: 'none',
    color: 'white',
    'font-weight': 'bold',
    padding: '4px 8px',
  },
  '.button--danger:hover': {
    'background-color': '#E23936',
  },
};
