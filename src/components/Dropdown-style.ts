import { HOVER_COLOR } from '../style-constants';

export const dropdownStyle = {
  '.dropdown-root': {
    cursor: 'pointer',
    position: 'relative',
    'z-index': 2,
  },
  '.dropdown-root .icon': {
    position: 'absolute',
    right: '7px',
    top: '3px',
    'z-index': 2,
  },
  '.dropdown-dropdown': {
    'box-shadow': '0 0 10px 1px grey',
    background: 'white',
    display: 'flex',
    position: 'absolute',
    'flex-direction': 'column',
    'max-height': '300px',
    'overflow-y': 'auto',
    padding: '5px 0',
    right: 0,
    top: '30px',
    width: '100%',
  },
  '.dropdown-input': {
    display: 'flex',
    'justify-content': 'space-between',
    position: 'relative',
  },
  '.dropdown-input input': {
    overflow: 'hidden',
    padding: '3px 20px 3px 8px',
    'text-overflow': 'ellipsis',
    width: '100%',
  },
  '.dropdown-input input:read-only': {
    cursor: 'pointer',
  },
  '.dropdown-option': {
    'flex-shrink': 0,
    padding: '2px 8px',
    'overflow-x': 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  '.dropdown-option:hover': {
    'background-color': HOVER_COLOR,
  },
};
