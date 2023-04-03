export const rowTitleStyles = {
  '.row-title': {
    display: 'flex',
    'flex-direction': 'column',
    'padding-left': '35px',
    position: 'relative',
  },
  '.row-title__pr-name': {
    overflow: 'hidden',
    'padding-bottom': '3px',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  '.row-title img': {
    'clip-path': 'circle()',
    height: '30px',
    width: '30px',
    border: '1px solid black',
    'border-radius': '15px',
    position: 'absolute',
    left: 0,
    top: '4px',
  }
};
