import { InlineStyle } from './inlineStyles';
import { rowTitleStyles } from './components/RowTitle/RowTitle.style';
import { headerOptionsStyle } from './components/HeaderOptions/HeaderOptions-style';
import { dropdownStyle } from './components/Dropdown/Dropdown-style';
import { buttonStyle } from './components/Button/Button-style';
import { iconsStyle } from './components/Icons/Icons.style';
import { columnFilterStyle } from './components/ColumnFilter/ColumnFilter.style';
import { userStatsStyle } from './components/UserStats/UserStats.style';
import { spinnerStyle } from './components/Spinner/Spinner.style';
import { reviewersStyle } from './components/Reviewers/Reviewers.style';
import { appStyle } from './components/App/App.style';
import { drawerStyle } from './components/Drawer/Drawer.style';

export const initStyles = () => {
  InlineStyle({
    body: {
      '--color-background': '#FCFDFF',
      '--color-background-alt': '#F5F6FF',
      'background-color': 'var(--color-background)',
      'font-family':
        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
      'font-size': '14px',
    },
    select: {
      height: '24px',
    },
    button: {
      height: '24px',
      cursor: 'pointer',
    },
    '.row': {
      'background-color': 'var(--color-background)',
      padding: '4px 8px',
      display: 'flex',
      height: '40px',
      'justify-content': 'space-around',
      width: '100%',
    },
    '.row:nth-child(odd)': {
      '--color-background': 'var(--color-background-alt)',
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
      width: '180px',
    },
    '.row-col.reviewers-col': {
      position: 'relative',
    },
    '.activity-col': {
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
    ...appStyle,
    ...drawerStyle,
    ...dropdownStyle,
    ...rowTitleStyles,
    ...headerOptionsStyle,
    ...buttonStyle,
    ...iconsStyle,
    ...columnFilterStyle,
    ...reviewersStyle,
    ...spinnerStyle,
    ...userStatsStyle,
  });
};
