import { overflowEllipsis } from '../../styleUtils';

export const dropdownStyle = {
  '.dropdown-root': {
    'border-radius': 'var(--dropdown-border-radius)',
    cursor: 'pointer',
    position: 'relative',
  },
  '.dropdown-root--show-changed': {
    'box-shadow': 'var(--shadow-filter-highlight)',
  },
  '.dropdown-root--disabled': {
    cursor: 'default',
    'pointer-events': 'none',
  },
  '.dropdown-root--disabled .dropdown-input input': {
    background: 'var(--color-disabled)',
    border: '1px solid var(--color-disabled)',
  },
  '.dropdown-root--disabled .dropdown-input': {
    background: 'var(--color-disabled)',
  },
  '.dropdown-root .icon': {
    color: 'var(--color-input-icon)',
    position: 'absolute',
    right: '7px',
    top: '3px',
    'z-index': 2,
  },
  '.dropdown-dropdown': {
    'box-shadow': '0 0 10px 1px grey',
    background: 'var(--color-background-alt)',
    display: 'flex',
    position: 'absolute',
    'flex-direction': 'column',
    'max-height': '300px',
    'overflow-y': 'auto',
    padding: '5px 0',
    right: 0,
    top: '30px',
    width: '100%',
    'z-index': 5,
  },
  '.dropdown-input': {
    display: 'flex',
    'border-radius': 'var(--dropdown-border-radius)',
    'justify-content': 'space-between',
    position: 'relative',
  },
  '.dropdown-input input': {
    ...overflowEllipsis,
    'background-color': 'var(--color-input-background)',
    border: '1px solid var(--color-border)',
    'border-radius': 'var(--dropdown-border-radius)',
    padding: '3px 20px 3px 8px',
    width: '100%',
  },
  '.dropdown-input input:read-only': {
    cursor: 'pointer',
  },
  '.dropdown__clear-btn': {
    color: 'var(--color-input-icon)',
    'line-height': '22px',
    opacity: '.5',
    padding: '0 5px',
    position: 'absolute',
    right: '21px',
  },
  '.dropdown__clear-btn:hover': {
    opacity: 1,
  },
  '.dropdown-option': {
    'flex-shrink': 0,
    padding: '2px 8px',
    ...overflowEllipsis,
    'overflow-x': 'hidden',
  },
  '.dropdown-option:not(.dropdown-option--no-results):hover': {
    'background-color': 'var(--color-background)',
  },
  '.dropdown-option--no-results': {
    cursor: 'default',
    opacity: 0.5,
  },
};
