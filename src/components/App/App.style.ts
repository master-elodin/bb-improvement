export const appStyle = {
  '.app__root': {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  '.app__header': {
    'border-bottom': '1px solid black',
    display: 'flex',
    'justify-content': 'space-between',
    padding: '10px',
  },
  '.app__user-section': {
    display: 'flex',
  },
  '.app__num-visible': {
    'font-size': '.8em',
    height: '45px',
    'line-height': '62px',
    'padding-left': '20px',
  },
  '.app__content': {
    'background-color': 'var(--color-background-alt)',
    display: 'flex',
    height: 'calc(100% - 60px)',
    padding: '10px 10px 0 0',
    width: 'calc(100% - 10px)',
    '--header-height': '30px',
  },
  '.app__content-loading-container': {
    display: 'flex',
    'justify-content': 'center',
    width: '100%',
  },
  '.app__content-header': {
    display: 'flex',
    height: 'var(--header-height)',
    'justify-content': 'space-around',
    'line-height': 'var(--header-height)',
    width: '100%',
  },
  '.app__content-header .icon': {
    opacity: 0.2,
  },
  '.app__content-header-col': {
    cursor: 'pointer',
    display: 'flex',
    'justify-content': 'space-between',
    'text-align': 'left',
  },
  '.app__content-header-label': {
    'padding-left': '8px',
  },
  '.app__content-header-col-actions': {
    display: 'flex',
    'padding-right': '8px',
  },
  '.app__header-action-container': {
    display: 'flex',
    'align-items': 'center',
  },
  '.app__refresh-btn.button': {
    height: '20px',
    'line-height': '20px',
    padding: '2px 8px',
  },
  '.app__content-body': {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
    'flex-shrink': 1,
    height: '100%',
    'min-width': 0,
  },
  '.app__content-rows': {
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
    width: '100%',
  },
  '.app__sort-arrows': {
    display: 'flex',
    'justify-content': 'flex-end',
  },
};
