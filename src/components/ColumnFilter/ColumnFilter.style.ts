export const columnFilterStyle = {
  '.column-filter': {
    cursor: 'pointer',
    'font-size': '12px',
    'margin-top': '3px',
    'margin-right': '10px',
    position: 'relative',
  },
  '.column-filter__popover': {
    'background-color': 'white',
    'border-radius': '5px',
    'box-shadow': '0 0 10px 1px grey',
    padding: '10px',
    position: 'absolute',
    right: 0,
    top: '20px',
    'z-index': 2,
  },
  '.column-filter__popover input': {
    padding: '2px 8px',
    'min-width': '240px',
  },
  '.column-filter__clear-btn': {
    color: 'var(--color-input-icon)',
    'line-height': '22px',
    opacity: '.5',
    padding: '0 5px',
    position: 'absolute',
    right: '15px',
    top: '10px',
  },
  '.column-filter__clear-btn:hover': {
    opacity: 1,
  },
  '.column-filter__icon': {
    'border-radius': '10px',
    height: '21px',
    'margin-top': '3px',
    width: '20px',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  },
  '.column-filter__icon--changed': {
    'box-shadow': '-2px -2px 7px var(--color-highlight), 2px 2px 7px var(--color-highlight)',
  },
};
