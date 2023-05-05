import { InlineStyle } from './inlineStyles';
import { rowTitleStyles } from './components/RowTitle/RowTitle.style';
import { drawerFiltersStyle } from './components/DrawerFilters/DrawerFilters.style';
import { dropdownStyle } from './components/Dropdown/Dropdown-style';
import { buttonStyle } from './components/Button/Button-style';
import { iconsStyle } from './components/Icons/Icons.style';
import { userStatsStyle } from './components/UserStats/UserStats.style';
import { spinnerStyle } from './components/Spinner/Spinner.style';
import { reviewersStyle } from './components/Reviewers/Reviewers.style';
import { appStyle } from './components/App/App.style';
import { drawerStyle } from './components/Drawer/Drawer.style';
import { darkModeToggleStyle } from './components/App/DarkModeToggle.style';
import { regexFilterStyle } from './components/DrawerFilters/RegexFilter/RegexFilter.style';
import { appHeaderStyle } from './components/App/AppHeader/AppHeader.style';
import { modalStyle } from './components/Modal/Modal.style';
import { savedRegexDropdownStyle } from './components/DrawerFilters/RegexFilter/SavedRegexDropdown.style';
import { popoverStyle } from './components/Popover/Popover.style';
import { buildStatusStyle } from './components/BuildStatus/BuildStatus.style';

export const initStyles = () => {
  InlineStyle({
    body: {
      'background-color': 'var(--color-background-alt)',
      'font-family':
        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
      'font-size': '14px',
      margin: 0,
    },
    'a, .link': {
      color: 'var(--color-link) !important',
    },
    select: {
      height: '24px',
    },
    button: {
      height: '24px',
      cursor: 'pointer',
    },
    '.row': {
      'background-color': 'var(--color-background-alt)',
      padding: '4px 8px',
      display: 'flex',
      height: '40px',
      'justify-content': 'space-around',
      width: 'calc(100% - 16px)',
    },
    '.row:nth-child(odd)': {
      '--color-background-alt': 'var(--color-background)',
    },
    '.row-col': {
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
    },
    '.name-col': {
      'min-width': '750px',
      width: '65%',
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
      'align-items': 'center',
      display: 'flex',
      'justify-content': 'center',
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
    ...appHeaderStyle,
    ...buildStatusStyle,
    ...buttonStyle,
    ...darkModeToggleStyle,
    ...drawerFiltersStyle,
    ...drawerStyle,
    ...dropdownStyle,
    ...iconsStyle,
    ...modalStyle,
    ...popoverStyle,
    ...regexFilterStyle,
    ...reviewersStyle,
    ...rowTitleStyles,
    ...savedRegexDropdownStyle,
    ...spinnerStyle,
    ...userStatsStyle,
  });
};
