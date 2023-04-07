export const appStyle = {
  '.app__root': {
    height: 'calc(100vh - 40px)',
    overflow: 'hidden',
    padding: '10px 0',
    width: '100vw',
  },
  '.app__header': {
    'border-bottom': '1px solid black',
    display: 'flex',
    'justify-content': 'space-between',
    'margin-bottom': '20px',
    padding: '0 20px 10px 20px',
  },
  '.app__user-section': {
    display: 'flex',
    margin: '0 10px',
  },
  '.app__num-visible': {
    'font-size': '.8em',
    height: '45px',
    'line-height': '62px',
    'padding-left': '20px',
  },
  '.app__content': {
    height: 'calc(100% - 60px)',
    padding: '0 20px 20px 20px',
    width: 'calc(100% - 40px)',
  },
  '.app__content-loading-container': {
    display: 'flex',
    'justify-content': 'center',
    width: '100%',
  },
  '.app__content-header': {
    display: 'flex',
    height: '25px',
    'justify-content': 'space-around',
    'line-height': '25px',
    'padding-bottom': '5px',
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
  '.app__content-rows': {
    height: 'calc(100% - 48px)',
    'overflow-x': 'hidden',
    'overflow-y': 'scroll',
    width: '100%',
  },
  '.app__sort-arrows': {
    display: 'flex',
    'justify-content': 'flex-end',
  },
};
