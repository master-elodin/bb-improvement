import { overflowEllipsis } from '../../../styleUtils';

export const rowTitleStyles = {
  '.row-title': {
    display: 'flex',
    gap: 'var(--spacing-md)',
  },
  '.row-title__text': {
    overflow: 'hidden',
  },
  '.row-title__pr-name': {
    ...overflowEllipsis,
    'padding-bottom': '3px',
  },
  '.row-title img': {
    'clip-path': 'circle()',
    height: '30px',
    width: '30px',
    border: '1px solid black',
    'border-radius': '15px',
  },
  '.row-title__extra-info': {
    ...overflowEllipsis,
    'font-size': '0.8em',
  },
  '.row-title__extra-info a': {
    'font-style': 'italic',
    'text-decoration': 'none !important',
  },
};
