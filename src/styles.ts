import { InlineStyle } from './inlineStyles';

const fullWidth = 'calc(100vw - 50px)';

InlineStyle({
  body: {
    'background-color': 'rgba(236, 240, 241, .2)',
  },
  select: {
    height: '24px',
  },
  button: {
    height: '24px',
    cursor: 'pointer',
  },
  '.root': {
    padding: '20px 0',
    'font-family':
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    height: 'calc(100vh - 40px)',
    overflow: 'hidden',
  },
  '.content': {
    height: 'calc(100% - 60px)',
    padding: '0 20px 20px 20px',
    width: fullWidth,
  },
  '.spinner': {
    border: '6px solid rgba(0, 0, 0, 0.15)',
    'border-radius': '50%',
    width: '64px',
    height: '64px',
    'border-top-color': 'rgba(0, 0, 0, 0.5)',
    animation: 'rotate 1s linear infinite',
  },
  '.content-header': {
    display: 'flex',
    height: '35px',
    'justify-content': 'space-around',
    'padding-bottom': '5px',
    width: fullWidth,
  },
  '.row': {
    padding: '4px 8px',
    display: 'flex',
    height: '40px',
    'justify-content': 'space-around',
    width: fullWidth,
  },
  '.row:nth-child(odd)': {
    'background-color': 'rgba(236, 240, 241, .6)',
  },
  '.row-col': {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  },
  '.name-col': {
    'flex-grow': 1,
    'min-width': '750px',
  },
  '.tasks-col': {
    width: '100px',
  },
  '.row-col.tasks-col': {
    'line-height': '40px;',
  },
  '.row-col.tasks-col span': {
    'padding-left': '12px;',
  },
  '.comments-col': {
    width: '130px',
  },
  '.row-col.comments-col': {
    'line-height': '40px;',
  },
  '.row-col.comments-col span': {
    'padding-left': '12px;',
  },
  '.build-col': {
    width: '100px',
  },
  '.row .build-col': {
    position: 'relative',
  },
  '.row .build-col svg': {
    left: 'calc(50% - 20px)',
    position: 'absolute',
    top: '10px',
  },
  '.reviewers-col': {
    width: '20%',
  },
  '.row-col.reviewers-col': {
    position: 'relative',
  },
  '.activity-col': {
    'min-width': '190px',
    width: '190px',
  },
  '.row-col.activity-col': {
    display: 'flex',
    'flex-direction': 'column',
    'padding-top': '4px',
  },
  '.last-activity': {
    'padding-left': '8px',
  },
  '.reviewerAvatar': {
    position: 'absolute',
    display: 'inline-block',
    top: '7px',
  },
  '.reviewerAvatar img': {
    'clip-path': 'circle()',
    height: '24px',
    width: '24px',
    border: '1px solid black',
    'border-radius': '12px',
  },
  // Dropdown
  '.dropdown-root': {
    cursor: 'pointer',
    position: 'relative',
    width: '300px',
    'z-index': 2,
  },
  '.dropdown-root .icon': {
    position: 'absolute',
    right: '5px',
    'z-index': 2,
  },
  '.dropdown-root input': {
    padding: '3px 8px',
    width: '100%',
  },
  '.dropdown-dropdown': {
    'box-shadow': '0 0 10px 1px grey',
    background: 'white',
    display: 'flex',
    position: 'absolute',
    'flex-direction': 'column',
    padding: '5px 0',
    right: 0,
    top: '30px',
  },
  '.dropdown-input': {
    display: 'flex',
    'justify-content': 'space-between',
    position: 'relative',
  },
  '.dropdown-option': {
    padding: '2px 8px',
  },
});

export { fullWidth };
