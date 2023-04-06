export const filterDropdownStyle = {
  '.filter-dropdown': {
    cursor: 'pointer',
    'font-size': '12px',
    'margin-top': '3px',
    'margin-right': '10px',
    position: 'relative',
  },
  '.filter-dropdown__popover': {
    'background-color': 'white',
    'border-radius': '5px',
    'box-shadow': '0 0 10px 1px grey',
    padding: '10px',
    position: 'absolute',
    right: 0,
    top: '20px',
    'z-index': 2,
  },
  '.filter-dropdown__popover input': {
    padding: '2px 8px',
    'min-width': '240px',
  },
  '.filter-dropdown__clear-btn': {
    'line-height': '22px',
    opacity: '.5',
    padding: '0 5px',
    position: 'absolute',
    right: '15px',
    top: '10px',
  },
  '.filter-dropdown__clear-btn:hover': {
    opacity: 1,
  }
};
