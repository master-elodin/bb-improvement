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
    'align-items': 'center',
    'display': 'flex',
    'gap': '4px',
    'padding-bottom': '3px',
  },
  '.row-title__draft': {
    'align-items': 'center',
    'background': 'var(--tag-background)',
    'border-radius': '3px',
    'box-sizing': 'border-box',
    'color': 'var(--tag-color)',
    'display': 'inline-flex',
    'font-size': '11px',
    'font-weight': '700',
    'height': '16px',
    'padding': '2px 4px',
    'white-space': 'nowrap',
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
