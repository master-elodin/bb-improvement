export const rowStyle = {
  '.row': {
    'background-color': 'var(--color-background-alt)',
    padding: '4px 8px',
    display: 'flex',
    height: '40px',
    'justify-content': 'space-around',
    width: 'calc(100% - 16px)',
  },
  '.row:nth-child(odd)': {
    '--color-background-alt': 'var(--color-background)',
  },
  '.tasks-col': {
    width: '100px',
  },
  '.row__number': {
    'align-items': 'center',
    display: 'flex',
    height: '100%',
    'justify-content': 'center',
  },
  '.row__build-status': {
    'align-items': 'center',
    display: 'flex',
    height: '100%',
    'padding-left': '30px',
  },
  '.row__last-activity': {
    'padding': '4px 0 0 16px',
  }
};
