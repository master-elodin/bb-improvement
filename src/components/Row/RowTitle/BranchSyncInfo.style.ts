export const branchSyncInfoStyles = {
  '.branch-sync': {
    cursor: 'pointer',
    'padding-left': '8px',
  },
  '.branch-sync--warn': {
    color: 'red',
  },
  '.branch-sync__summary': {
    display: 'flex',
    'flex-direction': 'column',
    'font-size': 'var(--text-size)',
    gap: 'var(--spacing-md)',
    height: '100%',
  },
  '.branch-sync__loading-indicator': {
    'align-items': 'center',
    display: 'flex',
    height: '100%',
    'justify-content': 'center',
    width: '100%',
  },
  '.branch-sync__title': {
    'font-weight': 'bold',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    width: '100%',
    'white-space': 'nowrap',
  },
  '.branch-sync__content': {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
    height: 'calc(100% - 50px)',
  },
  '.branch-sync__detail': {
    display: 'flex',
    gap: 'var(--spacing-md)'
  },
  '.branch-sync__actions': {
    display: 'flex',
    gap: 'var(--spacing-md)',
    'justify-content': 'flex-end',
  },
  '.branch-sync__conflicts-container': {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
    gap: 'var(--spacing-md)',
    'overflow-y': 'auto',
    'padding-top': 'var(--spacing-lg)',
  },
  '.branch-sync__conflicts-container > div': {
    color: 'red',
  },
  '.branch-sync__conflicts-container ul': {
    margin: '0',
  },
};
