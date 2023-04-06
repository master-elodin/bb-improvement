export const userStatsStyle = {
  '.user-stats': {
    position: 'relative',
  },
  '.user-stats__trigger': {
    cursor: 'pointer',
  },
  '.user-stats__content': {
    'box-shadow': '0 0 10px 1px grey',
    background: 'white',
    display: 'flex',
    position: 'absolute',
    'flex-direction': 'column',
    'max-height': '300px',
    'overflow-y': 'auto',
    padding: '.8em',
    right: 0,
    top: '30px',
    width: '300px',
    'z-index': '3',
  },
  '.user-stats__content-row': {
    display: 'flex',
    'justify-content': 'space-between',
    'line-height': '1.5em',
  },
  '.user-stats__content-row__label': {
    'font-weight': 'bold',
  },
  '.user-stats__content-row__value': {
    opacity: '0.8',
  },
};
