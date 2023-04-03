import { InlineStyle } from './inlineStyles';
import { rowTitleStyles } from './components/RowTitle/RowTitle-style';
import { headerOptionsStyle } from './components/HeaderOptions/HeaderOptions-style';
import { dropdownStyle } from './components/Dropdown/Dropdown-style';
import { FULL_WIDTH, HOVER_COLOR } from './style-constants';
import { buttonStyle } from './components/Button/Button-style';
import { iconsStyle } from './components/Icons/Icons.style';
import { filterDropdownStyle } from './components/FilterDropdown/FilterDropdown.style';

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
    padding: '10px 0',
    'font-family':
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    height: 'calc(100vh - 40px)',
    overflow: 'hidden',
  },
  '.content': {
    height: 'calc(100% - 60px)',
    padding: '0 20px 20px 20px',
    width: FULL_WIDTH,
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
    width: FULL_WIDTH,
  },
  '.content-header .icon': {
    opacity: .2,
  },
  '.row': {
    padding: '4px 8px',
    display: 'flex',
    height: '40px',
    'justify-content': 'space-around',
    width: FULL_WIDTH,
  },
  '.row:nth-child(odd)': {
    'background-color': HOVER_COLOR,
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
  ...dropdownStyle,
  ...rowTitleStyles,
  ...headerOptionsStyle,
  ...buttonStyle,
  ...iconsStyle,
  ...filterDropdownStyle,
});

export { FULL_WIDTH };
